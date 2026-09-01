import { Router } from 'express';
import db from '../db.js';
import { currentEmployeeId } from '../lib/currentEmployee.js';

export const router = Router();

function formatDuration(ms) {
  const mins = Math.max(0, Math.round(ms / 60000));
  if (mins >= 1440) return `${Math.floor(mins / 1440)}д ${Math.floor((mins % 1440) / 60)}ч`;
  if (mins >= 60) return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
}

// SQLite's datetime('now') stores UTC as "YYYY-MM-DD HH:MM:SS" with no
// timezone marker. Left as-is, `new Date(...)` in the browser parses it as
// *local* time, which skews any live countdown by the viewer's UTC offset.
// Marking it explicitly as UTC keeps the stopwatch correct everywhere.
function toIsoUtc(ts) {
  if (!ts) return ts;
  return ts.includes('T') ? ts : ts.replace(' ', 'T') + 'Z';
}

function teamNames(callId) {
  return db.prepare(`
    SELECT e.name FROM call_team ct JOIN employees e ON e.id = ct.employee_id WHERE ct.call_id = ?
  `).all(callId).map(r => r.name);
}

function callDetail(c) {
  return {
    id: c.id,
    phone: c.phone || '',
    agreement: c.agreement_number || '',
    topic: c.topic || '',
    essence: c.essence || '',
    isClient: c.is_client == null ? null : !!c.is_client,
    transferCorrect: c.transfer_correct == null ? null : !!c.transfer_correct,
    malfunction: !!c.malfunction,
    requiresTicket: !!c.requires_ticket,
    status: c.status,
    startedAt: toIsoUtc(c.started_at),
    endedAt: toIsoUtc(c.ended_at),
    agentId: c.agent_id,
    agentName: c.agent_name,
    isMine: c.agent_id === currentEmployeeId(),
    ticket: c.ticket_number || null,
  };
}

router.get('/', (req, res) => {
  const { view = 'ongoing' } = req.query;
  if (view === 'history') {
    // Личная история звонков — только звонки текущего оператора, чужие
    // звонки в неё не попадают.
    const rows = db.prepare(`
      SELECT c.*, e.name AS agent_name, t.number AS ticket_number
      FROM calls c LEFT JOIN employees e ON e.id = c.agent_id LEFT JOIN tickets t ON t.id = c.ticket_id
      WHERE c.status = 'ended' AND c.agent_id = ? ORDER BY c.started_at DESC
    `).all(currentEmployeeId());
    return res.json(rows.map(c => ({
      id: c.id,
      name: c.phone || c.client_name,
      agent: c.agent_name,
      date: new Date(c.started_at).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
      duration: formatDuration(new Date(c.ended_at) - new Date(c.started_at)),
      topic: c.topic,
      rec: !!c.recorded,
      ticket: c.ticket_number,
      isClient: c.is_client == null ? null : !!c.is_client,
      transferCorrect: c.transfer_correct == null ? null : !!c.transfer_correct,
      malfunction: !!c.malfunction,
    })));
  }
  const me = currentEmployeeId();
  const rows = db.prepare(`
    SELECT c.*, e.name AS agent_name FROM calls c LEFT JOIN employees e ON e.id = c.agent_id
    WHERE c.status IN ('ongoing','starting','break') ORDER BY c.started_at ASC
  `).all();
  res.json({
    ongoing: rows.filter(c => c.status === 'ongoing').map(c => ({
      id: c.id,
      name: c.phone || c.client_name,
      duration: formatDuration(Date.now() - new Date(c.started_at)),
      incoming: c.incoming_count,
      pending: c.pending_count,
      team: teamNames(c.id),
      isMine: c.agent_id === me,
    })),
    starting: rows.filter(c => c.status === 'starting').map(c => c.client_name),
    onBreak: rows.filter(c => c.status === 'break').map(c => [c.client_name, formatDuration(Date.now() - new Date(c.started_at))]),
  });
});

// Начать звонок: создаём "текущий" звонок и сразу открываем его как
// отдельную живую страницу с секундомером — данные по нему дозаполняются
// по ходу разговора и сохраняются автосохранением (PATCH), пока оператор
// не нажмёт "Завершить звонок".
router.post('/', (req, res) => {
  const info = db.prepare(`
    INSERT INTO calls (client_name, agent_id, status, started_at, recorded)
    VALUES ('', ?, 'ongoing', datetime('now'), 1)
  `).run(currentEmployeeId());
  const c = db.prepare('SELECT c.*, e.name AS agent_name FROM calls c LEFT JOIN employees e ON e.id = c.agent_id WHERE c.id = ?').get(info.lastInsertRowid);
  res.status(201).json(callDetail(c));
});

router.get('/:id', (req, res) => {
  const c = db.prepare(`
    SELECT c.*, e.name AS agent_name, t.number AS ticket_number FROM calls c
    LEFT JOIN employees e ON e.id = c.agent_id LEFT JOIN tickets t ON t.id = c.ticket_id WHERE c.id = ?
  `).get(req.params.id);
  if (!c) return res.status(404).json({ error: 'not found' });
  res.json(callDetail(c));
});

router.patch('/:id', (req, res) => {
  const { phone, agreement, topic, essence, isClient, transferCorrect, malfunction, requiresTicket } = req.body;
  const call = db.prepare('SELECT * FROM calls WHERE id = ?').get(req.params.id);
  if (!call) return res.status(404).json({ error: 'not found' });
  db.prepare(`
    UPDATE calls SET
      phone = COALESCE(?, phone),
      client_name = COALESCE(?, client_name),
      agreement_number = COALESCE(?, agreement_number),
      topic = COALESCE(?, topic),
      essence = COALESCE(?, essence),
      is_client = COALESCE(?, is_client),
      transfer_correct = COALESCE(?, transfer_correct),
      malfunction = COALESCE(?, malfunction),
      requires_ticket = COALESCE(?, requires_ticket)
    WHERE id = ?
  `).run(
    phone ?? null, phone ?? null, agreement != null ? agreement.slice(0, 6).toUpperCase() : null,
    topic ?? null, essence ?? null,
    isClient == null ? null : (isClient ? 1 : 0),
    transferCorrect == null ? null : (transferCorrect ? 1 : 0),
    malfunction == null ? null : (malfunction ? 1 : 0),
    requiresTicket == null ? null : (requiresTicket ? 1 : 0),
    req.params.id
  );
  const c = db.prepare('SELECT c.*, e.name AS agent_name, t.number AS ticket_number FROM calls c LEFT JOIN employees e ON e.id = c.agent_id LEFT JOIN tickets t ON t.id = c.ticket_id WHERE c.id = ?').get(req.params.id);
  res.json(callDetail(c));
});

router.post('/:id/finish', (req, res) => {
  const call = db.prepare('SELECT * FROM calls WHERE id = ?').get(req.params.id);
  if (!call) return res.status(404).json({ error: 'not found' });
  db.prepare("UPDATE calls SET status = 'ended', ended_at = datetime('now') WHERE id = ?").run(req.params.id);
  const c = db.prepare('SELECT c.*, e.name AS agent_name, t.number AS ticket_number FROM calls c LEFT JOIN employees e ON e.id = c.agent_id LEFT JOIN tickets t ON t.id = c.ticket_id WHERE c.id = ?').get(req.params.id);
  res.json(callDetail(c));
});

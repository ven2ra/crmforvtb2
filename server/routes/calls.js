import { Router } from 'express';
import db from '../db.js';

export const router = Router();

function formatDuration(ms) {
  const mins = Math.max(0, Math.round(ms / 60000));
  if (mins >= 60) {
    const h = Math.floor(mins / 60), m = mins % 60;
    return h >= 1440 / 60 && mins >= 1440 ? `${Math.floor(mins / 1440)}д ${Math.floor((mins % 1440) / 60)}ч` : `${h}ч ${m}м`;
  }
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
}

function teamNames(callId) {
  return db.prepare(`
    SELECT e.name FROM call_team ct JOIN employees e ON e.id = ct.employee_id WHERE ct.call_id = ?
  `).all(callId).map(r => r.name);
}

router.get('/', (req, res) => {
  const { view = 'ongoing' } = req.query;
  if (view === 'history') {
    const rows = db.prepare(`
      SELECT c.*, e.name AS agent_name, t.number AS ticket_number
      FROM calls c LEFT JOIN employees e ON e.id = c.agent_id LEFT JOIN tickets t ON t.id = c.ticket_id
      WHERE c.status = 'ended' ORDER BY c.started_at DESC
    `).all();
    return res.json(rows.map(c => ({
      id: c.id,
      name: c.client_name,
      agent: c.agent_name,
      date: new Date(c.started_at).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
      duration: formatDuration(new Date(c.ended_at) - new Date(c.started_at)),
      result: c.result,
      rec: !!c.recorded,
      ticket: c.ticket_number,
    })));
  }
  const rows = db.prepare(`
    SELECT c.*, e.name AS agent_name FROM calls c LEFT JOIN employees e ON e.id = c.agent_id
    WHERE c.status IN ('ongoing','starting','break') ORDER BY c.started_at ASC
  `).all();
  res.json({
    ongoing: rows.filter(c => c.status === 'ongoing').map(c => ({
      id: c.id,
      name: c.client_name,
      duration: formatDuration(Date.now() - new Date(c.started_at)),
      incoming: c.incoming_count,
      pending: c.pending_count,
      team: teamNames(c.id),
    })),
    starting: rows.filter(c => c.status === 'starting').map(c => c.client_name),
    onBreak: rows.filter(c => c.status === 'break').map(c => [c.client_name, formatDuration(Date.now() - new Date(c.started_at))]),
  });
});

router.post('/:id/wrapup', (req, res) => {
  const { result, comment, createTicket, ticketFio } = req.body;
  const call = db.prepare('SELECT * FROM calls WHERE id = ?').get(req.params.id);
  if (!call) return res.status(404).json({ error: 'not found' });
  let ticketId = call.ticket_id;
  if (createTicket) {
    const number = String(80000 + db.prepare('SELECT COUNT(*) AS n FROM tickets').get().n + Math.floor(Math.random() * 5000));
    const info = db.prepare(`
      INSERT INTO tickets (number, client_name, topic, sd_number, essence, status, owner_id)
      VALUES (?, ?, 'Технический сбой', 'Запрос в ПП', ?, 'new', ?)
    `).run(number, ticketFio || call.client_name, comment || `Обращение создано из звонка #${call.id}`, call.agent_id);
    ticketId = info.lastInsertRowid;
  }
  db.prepare(`
    UPDATE calls SET status = 'ended', ended_at = datetime('now'), result = ?, comment = ?, ticket_id = ? WHERE id = ?
  `).run(result, comment || '', ticketId, req.params.id);
  res.json({ ok: true, ticketId });
});

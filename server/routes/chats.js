import { Router } from 'express';
import db from '../db.js';
import { currentEmployeeId } from '../lib/currentEmployee.js';

export const router = Router();

const fmtDate = (iso) => iso?.slice(0, 10).split('-').reverse().join('.');

// SQLite's datetime('now') stores UTC as "YYYY-MM-DD HH:MM:SS" with no
// timezone marker; mark it explicitly as UTC so the browser doesn't parse
// it as local time.
const toIsoUtc = (ts) => (!ts || ts.includes('T') ? ts : ts.replace(' ', 'T') + 'Z');

function chatSummary(c) {
  return {
    id: c.id,
    name: c.client_name || '',
    gkkUnk: c.gkk_unk || '',
    topic: c.topic || '',
    essence: c.essence || '',
    status: c.status === 'active' ? 'Активные' : 'Закрытые',
    date: fmtDate(c.created_at),
    time: c.created_at ? new Date(toIsoUtc(c.created_at)).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : '',
    ticket: c.ticket_number || null,
    transferCorrect: c.transfer_correct == null ? null : !!c.transfer_correct,
    malfunction: !!c.malfunction,
    requiresTicket: !!c.requires_ticket,
  };
}

router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT c.*, t.number AS ticket_number FROM chats c LEFT JOIN tickets t ON t.id = c.ticket_id ORDER BY c.id DESC
  `).all();
  res.json(rows.map(chatSummary));
});

// Начать чат: создаём пустую запись сразу и открываем её как редактируемую
// карточку — оператор ещё не знает данные клиента в момент нажатия кнопки,
// поэтому поля дозаполняются и автосохраняются по ходу разговора (PATCH),
// как и у звонков.
router.post('/', (req, res) => {
  const info = db.prepare(`
    INSERT INTO chats (client_name, agent_id, status) VALUES ('', ?, 'active')
  `).run(currentEmployeeId());
  const c = db.prepare('SELECT c.*, t.number AS ticket_number FROM chats c LEFT JOIN tickets t ON t.id = c.ticket_id WHERE c.id = ?').get(info.lastInsertRowid);
  res.status(201).json({ ...chatSummary(c), tags: [], note: '' });
});

router.get('/:id', (req, res) => {
  const c = db.prepare(`
    SELECT c.*, t.number AS ticket_number FROM chats c LEFT JOIN tickets t ON t.id = c.ticket_id WHERE c.id = ?
  `).get(req.params.id);
  if (!c) return res.status(404).json({ error: 'not found' });
  const tags = db.prepare('SELECT id, tag FROM chat_tags WHERE chat_id = ?').all(c.id);
  res.json({ ...chatSummary(c), note: c.note, closedDate: c.closed_at ? fmtDate(c.closed_at) : null, tags });
});

router.patch('/:id', (req, res) => {
  const { fio, gkkUnk, topic, essence, transferCorrect, malfunction, requiresTicket, status } = req.body;
  const chat = db.prepare('SELECT * FROM chats WHERE id = ?').get(req.params.id);
  if (!chat) return res.status(404).json({ error: 'not found' });

  const statusMap = { 'Активные': 'active', 'Закрытые': 'closed' };
  const dbStatus = statusMap[status] || status;
  if (dbStatus && ['active', 'closed'].includes(dbStatus)) {
    db.prepare("UPDATE chats SET status = ?, closed_at = CASE WHEN ? = 'closed' THEN datetime('now') ELSE closed_at END WHERE id = ?")
      .run(dbStatus, dbStatus, req.params.id);
  }
  db.prepare(`
    UPDATE chats SET
      client_name = COALESCE(?, client_name),
      gkk_unk = COALESCE(?, gkk_unk),
      topic = COALESCE(?, topic),
      essence = COALESCE(?, essence),
      transfer_correct = COALESCE(?, transfer_correct),
      malfunction = COALESCE(?, malfunction),
      requires_ticket = COALESCE(?, requires_ticket)
    WHERE id = ?
  `).run(
    fio ?? null, gkkUnk ?? null, topic ?? null, essence ?? null,
    transferCorrect == null ? null : (transferCorrect ? 1 : 0),
    malfunction == null ? null : (malfunction ? 1 : 0),
    requiresTicket == null ? null : (requiresTicket ? 1 : 0),
    req.params.id
  );

  const c = db.prepare('SELECT c.*, t.number AS ticket_number FROM chats c LEFT JOIN tickets t ON t.id = c.ticket_id WHERE c.id = ?').get(req.params.id);
  const tags = db.prepare('SELECT id, tag FROM chat_tags WHERE chat_id = ?').all(c.id);
  res.json({ ...chatSummary(c), note: c.note, tags });
});

router.post('/:id/tags', (req, res) => {
  const { tag } = req.body;
  if (!tag || !tag.trim()) return res.status(400).json({ error: 'tag is required' });
  const info = db.prepare('INSERT INTO chat_tags (chat_id, tag) VALUES (?, ?)').run(req.params.id, tag.trim());
  res.status(201).json({ id: info.lastInsertRowid, tag: tag.trim() });
});

router.delete('/:id/tags/:tagId', (req, res) => {
  db.prepare('DELETE FROM chat_tags WHERE id = ? AND chat_id = ?').run(req.params.tagId, req.params.id);
  res.json({ ok: true });
});

router.patch('/:id/note', (req, res) => {
  const { note } = req.body;
  db.prepare('UPDATE chats SET note = ? WHERE id = ?').run(note || '', req.params.id);
  res.json({ ok: true });
});

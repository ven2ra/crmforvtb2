import { Router } from 'express';
import db from '../db.js';

export const router = Router();

const fmtDate = (iso) => iso?.slice(0, 10).split('-').reverse().join('.');

// В приложении пока нет полноценной авторизации — карточка оператора в
// сайдбаре зафиксирована на "Иван Петров", поэтому новые чаты, заведённые
// вручную через форму, тоже относим на него.
function currentEmployeeId() {
  const row = db.prepare("SELECT id FROM employees WHERE name = 'Иван Петров' LIMIT 1").get()
    || db.prepare('SELECT id FROM employees LIMIT 1').get();
  return row?.id ?? null;
}

function chatSummary(c) {
  return {
    id: c.id,
    name: c.client_name,
    gkkUnk: c.gkk_unk,
    topic: c.topic,
    essence: c.essence,
    status: c.status === 'active' ? 'Активные' : 'Закрытые',
    date: fmtDate(c.created_at),
    time: c.created_at ? new Date(c.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : '',
    ticket: c.ticket_number || null,
    transferCorrect: c.transfer_correct == null ? null : !!c.transfer_correct,
    malfunction: !!c.malfunction,
  };
}

router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT c.*, t.number AS ticket_number FROM chats c LEFT JOIN tickets t ON t.id = c.ticket_id ORDER BY c.id DESC
  `).all();
  res.json(rows.map(chatSummary));
});

// Приём чата: оператор фиксирует данные обратившегося и параметры чата
// одной формой в момент открытия диалога — сам чат в системе не ведётся,
// это только запись о факте обращения.
router.post('/', (req, res) => {
  const { fio, gkkUnk, topic, essence, transferCorrect, malfunction, requiresTicket } = req.body;
  if (!fio || !fio.trim()) return res.status(400).json({ error: 'fio is required' });
  const info = db.prepare(`
    INSERT INTO chats (client_name, gkk_unk, topic, essence, agent_id, status, transfer_correct, malfunction, requires_ticket)
    VALUES (?, ?, ?, ?, ?, 'active', ?, ?, ?)
  `).run(
    fio.trim(), (gkkUnk || '').trim() || null, topic || '', essence || '', currentEmployeeId(),
    transferCorrect ? 1 : 0, malfunction ? 1 : 0, requiresTicket ? 1 : 0
  );
  const c = db.prepare('SELECT c.*, t.number AS ticket_number FROM chats c LEFT JOIN tickets t ON t.id = c.ticket_id WHERE c.id = ?').get(info.lastInsertRowid);
  res.status(201).json({ ...chatSummary(c), requiresTicket: !!c.requires_ticket, tags: [], note: '' });
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
  const { status } = req.body;
  const statusMap = { 'Активные': 'active', 'Закрытые': 'closed' };
  const dbStatus = statusMap[status] || status;
  const chat = db.prepare('SELECT * FROM chats WHERE id = ?').get(req.params.id);
  if (!chat) return res.status(404).json({ error: 'not found' });
  if (dbStatus && ['active', 'closed'].includes(dbStatus)) {
    db.prepare("UPDATE chats SET status = ?, closed_at = CASE WHEN ? = 'closed' THEN datetime('now') ELSE closed_at END WHERE id = ?")
      .run(dbStatus, dbStatus, req.params.id);
  }
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

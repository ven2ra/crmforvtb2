import { Router } from 'express';
import db from '../db.js';

export const router = Router();

function chatSummary(c) {
  const last = db.prepare('SELECT * FROM chat_messages WHERE chat_id = ? ORDER BY id DESC LIMIT 1').get(c.id);
  const unread = db.prepare("SELECT COUNT(*) AS n FROM chat_messages WHERE chat_id = ? AND sender = 'client' AND read = 0").get(c.id).n;
  return {
    id: c.id,
    name: c.client_name,
    last: last?.text || '',
    time: last ? new Date(last.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : '',
    unread,
    status: c.status === 'active' ? 'Активные' : 'Закрытые',
    ticket: c.ticket_number || null,
  };
}

router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT c.*, t.number AS ticket_number FROM chats c LEFT JOIN tickets t ON t.id = c.ticket_id ORDER BY c.id DESC
  `).all();
  res.json(rows.map(chatSummary));
});

router.get('/:id', (req, res) => {
  const c = db.prepare(`
    SELECT c.*, t.number AS ticket_number FROM chats c LEFT JOIN tickets t ON t.id = c.ticket_id WHERE c.id = ?
  `).get(req.params.id);
  if (!c) return res.status(404).json({ error: 'not found' });
  const messages = db.prepare('SELECT * FROM chat_messages WHERE chat_id = ? ORDER BY id ASC').all(c.id);
  db.prepare("UPDATE chat_messages SET read = 1 WHERE chat_id = ? AND sender = 'client'").run(c.id);
  const tags = db.prepare('SELECT id, tag FROM chat_tags WHERE chat_id = ?').all(c.id);
  res.json({
    ...chatSummary(c),
    note: c.note,
    tags,
    messages: messages.map(m => ({ id: m.id, me: m.sender === 'agent', text: m.text, time: new Date(m.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) })),
  });
});

router.post('/:id/messages', (req, res) => {
  const { text } = req.body;
  const chat = db.prepare('SELECT * FROM chats WHERE id = ?').get(req.params.id);
  if (!chat) return res.status(404).json({ error: 'not found' });
  if (chat.status === 'closed') return res.status(400).json({ error: 'chat is closed' });
  if (!text || !text.trim()) return res.status(400).json({ error: 'text is required' });
  const info = db.prepare("INSERT INTO chat_messages (chat_id, sender, text, read) VALUES (?, 'agent', ?, 1)").run(chat.id, text.trim());
  const m = db.prepare('SELECT * FROM chat_messages WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json({ id: m.id, me: true, text: m.text, time: new Date(m.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) });
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

router.post('/:id/link-ticket', (req, res) => {
  const { ticketId } = req.body;
  db.prepare('UPDATE chats SET ticket_id = ? WHERE id = ?').run(ticketId, req.params.id);
  res.json({ ok: true });
});

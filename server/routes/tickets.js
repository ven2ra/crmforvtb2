import { Router } from 'express';
import db from '../db.js';

export const router = Router();

const fmtDate = (iso) => iso?.slice(0, 10).split('-').reverse().join('.');

function addBusinessDays(date, days) {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return result;
}

function deadlineFor(t) {
  const days = t.sd_number && t.sd_number !== 'Запрос в ПП' ? 5 : 4;
  const deadline = addBusinessDays(new Date(t.created_at), days);
  const closedOnTime = t.closed_at ? new Date(t.closed_at) <= deadline : null;
  const overdue = t.status !== 'closed' && new Date() > deadline;
  return { deadline: deadline.toISOString(), deadlineDate: fmtDate(deadline.toISOString()), deadlineDays: days, overdue, closedOnTime };
}

function ticketRow(t) {
  return {
    id: t.id,
    number: t.number,
    fio: t.client_name,
    agreement: t.agreement_number,
    topic: t.topic,
    sd: t.sd_number,
    essence: t.essence,
    status: t.status === 'new' ? 'Новое' : t.status === 'in_progress' ? 'В работе' : 'Закрыто',
    owner: t.owner_name,
    ownerId: t.owner_id,
    date: fmtDate(t.status === 'closed' ? t.closed_at : t.created_at),
    ...deadlineFor(t),
  };
}

router.get('/', (req, res) => {
  const { status } = req.query;
  const statusMap = { 'Новые': 'new', 'В работе': 'in_progress', 'Закрытые': 'closed' };
  let sql = `SELECT t.*, e.name AS owner_name FROM tickets t LEFT JOIN employees e ON e.id = t.owner_id`;
  const params = [];
  if (status && statusMap[status]) {
    sql += ' WHERE t.status = ?';
    params.push(statusMap[status]);
  }
  sql += ' ORDER BY t.created_at DESC';
  const rows = db.prepare(sql).all(...params);
  res.json(rows.map(ticketRow));
});

router.get('/history', (req, res) => {
  const rows = db.prepare(`
    SELECT t.*, e.name AS owner_name FROM tickets t LEFT JOIN employees e ON e.id = t.owner_id
    WHERE t.status = 'closed' ORDER BY t.closed_at DESC
  `).all();
  res.json(rows.map(t => {
    const created = new Date(t.created_at);
    const closed = new Date(t.closed_at);
    const mins = Math.max(1, Math.round((closed - created) / 60000));
    const duration = mins >= 1440 ? `${Math.floor(mins / 1440)}д ${Math.floor((mins % 1440) / 60)}ч` : mins >= 60 ? `${Math.floor(mins / 60)}ч ${mins % 60}м` : `${mins}м`;
    return {
      id: t.number,
      subject: t.essence || t.topic,
      client: t.client_name,
      owner: t.owner_name,
      closed: fmtDate(t.closed_at),
      duration,
      rating: t.rating || 0,
    };
  }));
});

router.get('/:id', (req, res) => {
  const t = db.prepare('SELECT t.*, e.name AS owner_name FROM tickets t LEFT JOIN employees e ON e.id = t.owner_id WHERE t.id = ?').get(req.params.id);
  if (!t) return res.status(404).json({ error: 'not found' });
  res.json({ ...ticketRow(t), createdAt: fmtDate(t.created_at), closedAt: t.closed_at ? fmtDate(t.closed_at) : null, rating: t.rating });
});

router.post('/', (req, res) => {
  const { fio, agreement, topic, essence, sd, ownerId, callId, chatId } = req.body;
  if (!fio || !fio.trim()) return res.status(400).json({ error: 'fio is required' });
  if (!topic || !topic.trim()) return res.status(400).json({ error: 'topic is required' });
  const number = String(80000 + db.prepare('SELECT COUNT(*) AS n FROM tickets').get().n + Math.floor(Math.random() * 5000));
  let owner = ownerId;
  if (!owner && callId) owner = db.prepare('SELECT agent_id FROM calls WHERE id = ?').get(callId)?.agent_id;
  if (!owner && chatId) owner = db.prepare('SELECT agent_id FROM chats WHERE id = ?').get(chatId)?.agent_id;
  owner = owner || db.prepare('SELECT id FROM employees ORDER BY RANDOM() LIMIT 1').get()?.id || null;
  const info = db.prepare(`
    INSERT INTO tickets (number, client_name, agreement_number, topic, sd_number, essence, status, owner_id)
    VALUES (?, ?, ?, ?, ?, ?, 'new', ?)
  `).run(number, fio.trim(), agreement || '', topic.trim(), sd?.trim() || 'Запрос в ПП', essence || '', owner);
  if (callId) db.prepare('UPDATE calls SET ticket_id = ? WHERE id = ?').run(info.lastInsertRowid, callId);
  if (chatId) db.prepare('UPDATE chats SET ticket_id = ? WHERE id = ?').run(info.lastInsertRowid, chatId);
  const row = db.prepare('SELECT t.*, e.name AS owner_name FROM tickets t LEFT JOIN employees e ON e.id = t.owner_id WHERE t.id = ?').get(info.lastInsertRowid);
  res.status(201).json(ticketRow(row));
});

router.patch('/:id', (req, res) => {
  const { status, rating, ownerId, topic, essence } = req.body;
  const statusMap = { 'Новое': 'new', 'В работе': 'in_progress', 'Закрыто': 'closed' };
  const dbStatus = statusMap[status] || status;
  const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.id);
  if (!ticket) return res.status(404).json({ error: 'not found' });
  if (dbStatus && ['new', 'in_progress', 'closed'].includes(dbStatus)) {
    db.prepare('UPDATE tickets SET status = ?, closed_at = CASE WHEN ? = ? THEN datetime(\'now\') ELSE closed_at END WHERE id = ?')
      .run(dbStatus, dbStatus, 'closed', req.params.id);
  }
  if (rating != null) db.prepare('UPDATE tickets SET rating = ? WHERE id = ?').run(rating, req.params.id);
  if (ownerId != null) db.prepare('UPDATE tickets SET owner_id = ? WHERE id = ?').run(ownerId, req.params.id);
  if (topic != null && topic.trim()) db.prepare('UPDATE tickets SET topic = ? WHERE id = ?').run(topic.trim(), req.params.id);
  if (essence != null) db.prepare('UPDATE tickets SET essence = ? WHERE id = ?').run(essence, req.params.id);
  const row = db.prepare('SELECT t.*, e.name AS owner_name FROM tickets t LEFT JOIN employees e ON e.id = t.owner_id WHERE t.id = ?').get(req.params.id);
  res.json({ ...ticketRow(row), createdAt: fmtDate(row.created_at), closedAt: row.closed_at ? fmtDate(row.closed_at) : null, rating: row.rating });
});

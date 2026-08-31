import { Router } from 'express';
import db from '../db.js';

export const router = Router();

const TOPICS = ['Возврат средств', 'Доставка', 'Технический сбой', 'Изменение условий договора', 'Претензия по качеству'];
router.get('/topics', (req, res) => res.json(TOPICS));

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
    date: (t.status === 'closed' ? t.closed_at : t.created_at)?.slice(0, 10).split('-').reverse().join('.'),
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
      closed: t.closed_at.slice(0, 10).split('-').reverse().join('.'),
      duration,
      rating: t.rating || 0,
    };
  }));
});

router.post('/', (req, res) => {
  const { fio, agreement, topic, essence, sd, ownerId } = req.body;
  if (!fio || !fio.trim()) return res.status(400).json({ error: 'fio is required' });
  const number = String(80000 + db.prepare('SELECT COUNT(*) AS n FROM tickets').get().n + Math.floor(Math.random() * 5000));
  const owner = ownerId || db.prepare('SELECT id FROM employees ORDER BY RANDOM() LIMIT 1').get()?.id || null;
  const info = db.prepare(`
    INSERT INTO tickets (number, client_name, agreement_number, topic, sd_number, essence, status, owner_id)
    VALUES (?, ?, ?, ?, ?, ?, 'new', ?)
  `).run(number, fio.trim(), agreement || '', topic || TOPICS[0], sd?.trim() || 'Запрос в ПП', essence || '', owner);
  const row = db.prepare('SELECT t.*, e.name AS owner_name FROM tickets t LEFT JOIN employees e ON e.id = t.owner_id WHERE t.id = ?').get(info.lastInsertRowid);
  res.status(201).json(ticketRow(row));
});

router.patch('/:id', (req, res) => {
  const { status, rating } = req.body;
  const statusMap = { 'Новое': 'new', 'В работе': 'in_progress', 'Закрыто': 'closed' };
  const dbStatus = statusMap[status] || status;
  const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.id);
  if (!ticket) return res.status(404).json({ error: 'not found' });
  if (dbStatus && ['new', 'in_progress', 'closed'].includes(dbStatus)) {
    db.prepare('UPDATE tickets SET status = ?, closed_at = CASE WHEN ? = ? THEN datetime(\'now\') ELSE closed_at END WHERE id = ?')
      .run(dbStatus, dbStatus, 'closed', req.params.id);
  }
  if (rating != null) db.prepare('UPDATE tickets SET rating = ? WHERE id = ?').run(rating, req.params.id);
  const row = db.prepare('SELECT t.*, e.name AS owner_name FROM tickets t LEFT JOIN employees e ON e.id = t.owner_id WHERE t.id = ?').get(req.params.id);
  res.json(ticketRow(row));
});

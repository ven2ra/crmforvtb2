import { Router } from 'express';
import db from '../db.js';

export const router = Router();

function last8DaysCounts(sql) {
  const days = [];
  for (let i = 7; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    days.push(d);
  }
  const stmt = db.prepare(sql);
  return days.map(d => stmt.get(d).n);
}

router.get('/', (req, res) => {
  const activeTickets = db.prepare("SELECT COUNT(*) AS n FROM tickets WHERE status != 'closed'").get().n;
  const callsToday = db.prepare("SELECT COUNT(*) AS n FROM calls WHERE date(started_at) = date('now')").get().n;
  const openChats = db.prepare("SELECT COUNT(*) AS n FROM chats WHERE status = 'active'").get().n;

  const avgRow = db.prepare(`
    SELECT AVG((julianday(closed_at) - julianday(created_at)) * 24 * 60) AS avg_mins
    FROM tickets WHERE status = 'closed' AND closed_at IS NOT NULL
  `).get();
  const avgMins = avgRow.avg_mins || 0;
  const avgResponse = avgMins >= 60 ? `${(avgMins / 60).toFixed(1)}ч` : `${avgMins.toFixed(1)}м`;

  const ticketsTrend = last8DaysCounts(`
    SELECT COUNT(*) AS n FROM tickets WHERE date(created_at) = ?
  `);
  const callsTrend = last8DaysCounts(`
    SELECT COUNT(*) AS n FROM calls WHERE date(started_at) = ?
  `);
  const chatsTrend = last8DaysCounts(`
    SELECT COUNT(*) AS n FROM (SELECT DISTINCT c.id FROM chats c JOIN chat_messages m ON m.chat_id = c.id WHERE date(m.created_at) = ?)
  `);

  const deptRows = db.prepare(`
    SELECT e.department AS department, COUNT(*) AS open_count
    FROM tickets t JOIN employees e ON e.id = t.owner_id
    WHERE t.status != 'closed'
    GROUP BY e.department
  `).all();
  const deptEmployeeCounts = db.prepare(`SELECT department, COUNT(*) AS n FROM employees GROUP BY department`).all();
  const capacity = Object.fromEntries(deptEmployeeCounts.map(r => [r.department, r.n * 3]));
  const departments = deptRows.map(r => ({
    name: r.department,
    load: Math.min(100, Math.round((r.open_count / (capacity[r.department] || 1)) * 100)),
  }));

  const upcomingTickets = db.prepare(`
    SELECT t.number, t.topic, t.essence, e.name AS owner_name, t.created_at
    FROM tickets t LEFT JOIN employees e ON e.id = t.owner_id
    WHERE t.status != 'closed' ORDER BY t.created_at DESC LIMIT 2
  `).all().map(t => ({
    time: new Date(t.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    title: `Обращение №${t.number} — ${t.topic}`,
    type: 'Обращение',
    person: t.owner_name || '—',
  }));
  const upcomingCalls = db.prepare(`
    SELECT c.client_name, e.name AS agent_name, c.started_at FROM calls c LEFT JOIN employees e ON e.id = c.agent_id
    WHERE c.status = 'starting' ORDER BY c.started_at DESC LIMIT 1
  `).all().map(c => ({
    time: new Date(c.started_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    title: `Звонок с клиентом ${c.client_name}`,
    type: 'Звонок',
    person: c.agent_name || '—',
  }));
  const upcomingChats = db.prepare(`
    SELECT c.client_name FROM chats c WHERE c.status = 'active' ORDER BY c.id DESC LIMIT 1
  `).all().map(c => ({
    time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    title: `Чат — ${c.client_name}`,
    type: 'Чат',
    person: c.client_name,
  }));
  const upcoming = [...upcomingCalls, ...upcomingTickets, ...upcomingChats].slice(0, 4);

  const totalEmployees = db.prepare('SELECT COUNT(*) AS n FROM employees').get().n;
  const onlineEmployees = db.prepare("SELECT COUNT(*) AS n FROM employees WHERE status != 'offline'").get().n;

  res.json({
    activeTickets,
    callsToday,
    openChats,
    avgResponse,
    ticketsTrend,
    callsTrend,
    chatsTrend,
    departments,
    upcoming,
    onlineEmployees,
    totalEmployees,
    date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
  });
});

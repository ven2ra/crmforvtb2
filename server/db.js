import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.DB_DIR || path.join(__dirname, '..', 'data');
fs.mkdirSync(dataDir, { recursive: true });
const dbPath = process.env.DB_PATH || path.join(dataDir, 'db.sqlite');

export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Оператор',
  department TEXT NOT NULL DEFAULT 'Поддержка',
  status TEXT NOT NULL DEFAULT 'online' CHECK(status IN ('online','busy','offline'))
);

CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  number TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  agreement_number TEXT NOT NULL DEFAULT '',
  topic TEXT NOT NULL,
  sd_number TEXT NOT NULL DEFAULT 'Запрос в ПП',
  essence TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','in_progress','closed')),
  owner_id INTEGER REFERENCES employees(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  closed_at TEXT,
  rating INTEGER
);

CREATE TABLE IF NOT EXISTS calls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_name TEXT NOT NULL,
  agent_id INTEGER REFERENCES employees(id),
  status TEXT NOT NULL DEFAULT 'ongoing' CHECK(status IN ('ongoing','starting','break','ended')),
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  ended_at TEXT,
  incoming_count INTEGER NOT NULL DEFAULT 0,
  pending_count INTEGER NOT NULL DEFAULT 0,
  result TEXT,
  comment TEXT,
  recorded INTEGER NOT NULL DEFAULT 1,
  ticket_id INTEGER REFERENCES tickets(id)
);

CREATE TABLE IF NOT EXISTS call_team (
  call_id INTEGER NOT NULL REFERENCES calls(id) ON DELETE CASCADE,
  employee_id INTEGER NOT NULL REFERENCES employees(id),
  PRIMARY KEY (call_id, employee_id)
);

CREATE TABLE IF NOT EXISTS chats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active','closed')),
  ticket_id INTEGER REFERENCES tickets(id),
  note TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK(sender IN ('agent','client')),
  text TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  read INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS chat_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  tag TEXT NOT NULL
);
`);

export default db;

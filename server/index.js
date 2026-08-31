import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './seed.js';
import { router as ticketsRouter } from './routes/tickets.js';
import { router as callsRouter } from './routes/calls.js';
import { router as chatsRouter } from './routes/chats.js';
import { router as statsRouter } from './routes/stats.js';
import { router as employeesRouter } from './routes/employees.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/tickets', ticketsRouter);
app.use('/api/calls', callsRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/stats', statsRouter);
app.use('/api/employees', employeesRouter);

app.get('/api/health', (req, res) => res.json({ ok: true }));

const distDir = path.join(__dirname, '..', 'dist');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distDir));
  app.get('/{*splat}', (req, res) => res.sendFile(path.join(distDir, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`ЕРС API listening on port ${PORT}`);
});

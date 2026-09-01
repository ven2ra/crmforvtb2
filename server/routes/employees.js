import { Router } from 'express';
import db from '../db.js';
import { currentEmployeeId } from '../lib/currentEmployee.js';

export const router = Router();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT id, name, role, department, status FROM employees ORDER BY name').all();
  res.json(rows);
});

router.get('/me', (req, res) => {
  const row = db.prepare('SELECT id, name, role, department, status FROM employees WHERE id = ?').get(currentEmployeeId());
  res.json(row || null);
});

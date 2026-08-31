import { Router } from 'express';
import db from '../db.js';

export const router = Router();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT id, name, role, department, status FROM employees ORDER BY name').all();
  res.json(rows);
});

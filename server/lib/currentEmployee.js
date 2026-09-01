import db from '../db.js';

// В приложении пока нет полноценной авторизации — карточка оператора в
// сайдбаре зафиксирована на "Иван Петров", поэтому все действия,
// выполняемые "от текущего пользователя" (начать звонок/чат, автора
// обращения по умолчанию), относим на него.
export function currentEmployeeId() {
  const row = db.prepare("SELECT id FROM employees WHERE name = 'Иван Петров' LIMIT 1").get()
    || db.prepare('SELECT id FROM employees LIMIT 1').get();
  return row?.id ?? null;
}

import db from './db.js';

const employeeCount = db.prepare('SELECT COUNT(*) AS n FROM employees').get().n;
if (employeeCount === 0) {
  const insertEmployee = db.prepare(
    'INSERT INTO employees (name, role, department, status) VALUES (?, ?, ?, ?)'
  );
  const employees = [
    ['Иван Петров', 'Оператор', 'Поддержка', 'online'],
    ['Мария Соколова', 'Оператор', 'Продажи', 'online'],
    ['Артём Ким', 'Оператор', 'Поддержка', 'busy'],
    ['Ольга Новак', 'Оператор', 'Техотдел', 'busy'],
    ['Дарья Лис', 'Оператор', 'Продажи', 'online'],
    ['Джек Линтон', 'Оператор', 'Поддержка', 'offline'],
    ['Самуэль Уотерс', 'Оператор', 'Продажи', 'offline'],
    ['Генри Мерсер', 'Оператор', 'Техотдел', 'offline'],
    ['Лиам Грейсон', 'Оператор', 'Продажи', 'online'],
    ['Мия Дженнингс', 'Оператор', 'Поддержка', 'online'],
  ];
  const ids = {};
  for (const e of employees) {
    const { lastInsertRowid } = insertEmployee.run(...e);
    ids[e[0]] = lastInsertRowid;
  }

  const insertTicket = db.prepare(`
    INSERT INTO tickets (number, client_name, agreement_number, topic, sd_number, essence, status, owner_id, created_at, closed_at, rating)
    VALUES (@number, @client_name, @agreement_number, @topic, @sd_number, @essence, @status, @owner_id, @created_at, @closed_at, @rating)
  `);
  const now = new Date();
  const daysAgo = n => new Date(now.getTime() - n * 86400000).toISOString();
  const hoursAgo = n => new Date(now.getTime() - n * 3600000).toISOString();

  const tickets = [
    { number: '85374', client_name: 'Соколова Мария Игоревна', agreement_number: 'СГ-2291/24', topic: 'Возврат средств', sd_number: 'SD-771204', essence: 'Клиент просит вернуть средства за неиспользованную услугу.', status: 'in_progress', owner_id: ids['Мария Соколова'], created_at: daysAgo(0), closed_at: null, rating: null },
    { number: '85401', client_name: 'Иванов Артём Сергеевич', agreement_number: 'СГ-0187/25', topic: 'Доставка', sd_number: 'Запрос в ПП', essence: 'Задержка доставки заказа более чем на 3 дня.', status: 'new', owner_id: ids['Артём Ким'], created_at: daysAgo(0), closed_at: null, rating: null },
    { number: '85212', client_name: 'ООО «Технополис» (Волков Н.П.)', agreement_number: 'СГ-4402/23', topic: 'Технический сбой', sd_number: 'SD-770988', essence: 'Ошибка авторизации в личном кабинете.', status: 'closed', owner_id: ids['Ольга Новак'], created_at: daysAgo(3), closed_at: hoursAgo(3 * 24 - 2), rating: 5 },
    { number: '85198', client_name: 'Петрова Елена Викторовна', agreement_number: 'СГ-3310/24', topic: 'Претензия по качеству', sd_number: 'Запрос в ПП', essence: 'Претензия по качеству оказанной услуги.', status: 'in_progress', owner_id: ids['Иван Петров'], created_at: daysAgo(3), closed_at: null, rating: null },
    { number: '85033', client_name: 'Кузнецов Д.И.', agreement_number: 'СГ-1180/24', topic: 'Технический сбой', sd_number: 'SD-770701', essence: 'Некорректная сумма в счёте.', status: 'closed', owner_id: ids['Иван Петров'], created_at: daysAgo(6), closed_at: hoursAgo(6 * 24 - 0.75), rating: 4 },
    { number: '84980', client_name: 'ИП Соколова', agreement_number: 'СГ-2755/23', topic: 'Доставка', sd_number: 'Запрос в ПП', essence: 'Задержка доставки на 3 дня.', status: 'closed', owner_id: ids['Мария Соколова'], created_at: daysAgo(9), closed_at: hoursAgo(7 * 24 + 2), rating: 3 },
    { number: '84902', client_name: 'ООО «Вектор»', agreement_number: 'СГ-0940/23', topic: 'Изменение условий договора', sd_number: 'Запрос в ПП', essence: 'Вопрос по тарифам обслуживания.', status: 'closed', owner_id: ids['Артём Ким'], created_at: daysAgo(12), closed_at: hoursAgo(11 * 24 + 20), rating: 5 },
  ];
  for (const t of tickets) insertTicket.run(t);

  const ticketId = number => db.prepare('SELECT id FROM tickets WHERE number = ?').get(number).id;

  const insertChat = db.prepare(`
    INSERT INTO chats (client_name, gkk_unk, topic, essence, agent_id, status, created_at, closed_at, transfer_correct, malfunction, requires_ticket, ticket_id, note)
    VALUES (@client_name, @gkk_unk, @topic, @essence, @agent_id, @status, @created_at, @closed_at, @transfer_correct, @malfunction, @requires_ticket, @ticket_id, @note)
  `);
  const insertTag = db.prepare('INSERT INTO chat_tags (chat_id, tag) VALUES (?, ?)');

  const chatSeeds = [
    { client_name: 'Мария Соколова', gkk_unk: 'УНК-2291', topic: 'Возврат средств', essence: 'Уточняет статус возврата по заказу №2291, отправила подтверждающие документы.', agent_id: ids['Мария Соколова'], status: 'active', created_at: hoursAgo(0.3), closed_at: null, transfer_correct: 1, malfunction: 0, requires_ticket: 1, ticket: '85374', note: '', tags: ['Приоритетный клиент', 'Возврат'] },
    { client_name: 'ООО «Вектор»', gkk_unk: null, topic: 'Изменение условий договора', essence: 'Ожидает обновление по тарифам обслуживания.', agent_id: ids['Артём Ким'], status: 'active', created_at: hoursAgo(0.6), closed_at: null, transfer_correct: 1, malfunction: 0, requires_ticket: 0, ticket: null, note: '', tags: [] },
    { client_name: 'Артём Ким', gkk_unk: 'УНК-3310', topic: 'Претензия по качеству', essence: 'Клиент подтвердил возврат по своей претензии.', agent_id: ids['Иван Петров'], status: 'active', created_at: hoursAgo(20), closed_at: null, transfer_correct: 1, malfunction: 0, requires_ticket: 1, ticket: '85198', note: '', tags: [] },
    { client_name: 'Техподдержка L2', gkk_unk: null, topic: 'Технический сбой', essence: 'Передан тикет №85212 дальше по эскалации.', agent_id: ids['Ольга Новак'], status: 'closed', created_at: hoursAgo(30), closed_at: hoursAgo(28), transfer_correct: 0, malfunction: 1, requires_ticket: 1, ticket: '85212', note: '', tags: [] },
    { client_name: 'Кузнецов Д.И.', gkk_unk: 'УНК-1180', topic: 'Технический сбой', essence: 'Спор по счёту закрыт, клиент поблагодарил за помощь.', agent_id: ids['Иван Петров'], status: 'closed', created_at: hoursAgo(50), closed_at: hoursAgo(49), transfer_correct: 1, malfunction: 0, requires_ticket: 1, ticket: '85033', note: '', tags: [] },
  ];
  for (const c of chatSeeds) {
    const { tags, ticket, ...row } = c;
    const { lastInsertRowid: chatId } = insertChat.run({ ...row, ticket_id: ticket ? ticketId(ticket) : null });
    for (const tag of tags) insertTag.run(chatId, tag);
  }

  const insertCall = db.prepare(`
    INSERT INTO calls (client_name, agent_id, status, started_at, ended_at, incoming_count, pending_count, result, comment, recorded, ticket_id)
    VALUES (@client_name, @agent_id, @status, @started_at, @ended_at, @incoming_count, @pending_count, @result, @comment, @recorded, @ticket_id)
  `);
  const insertCallTeam = db.prepare('INSERT INTO call_team (call_id, employee_id) VALUES (?, ?)');

  const minsAgo = n => new Date(now.getTime() - n * 60000).toISOString();
  const ongoingCalls = [
    { client_name: 'Софья Хайес', agent_id: ids['Иван Петров'], status: 'ongoing', started_at: minsAgo(278), ended_at: null, incoming_count: 24, pending_count: 0, result: null, comment: null, recorded: 1, ticket_id: null, team: ['Иван Петров', 'Артём Ким'] },
    { client_name: 'Оуэн Дарнелл', agent_id: ids['Мария Соколова'], status: 'ongoing', started_at: minsAgo(190), ended_at: null, incoming_count: 10, pending_count: 4, result: null, comment: null, recorded: 1, ticket_id: null, team: ['Мария Соколова'] },
    { client_name: 'Эмма Ларкин', agent_id: ids['Ольга Новак'], status: 'ongoing', started_at: minsAgo(389), ended_at: null, incoming_count: 29, pending_count: 8, result: null, comment: null, recorded: 1, ticket_id: null, team: ['Ольга Новак', 'Дарья Лис'] },
    { client_name: 'Лиам Грейсон', agent_id: ids['Лиам Грейсон'], status: 'starting', started_at: minsAgo(0), ended_at: null, incoming_count: 0, pending_count: 0, result: null, comment: null, recorded: 1, ticket_id: null, team: [] },
    { client_name: 'Мия Дженнингс', agent_id: ids['Мия Дженнингс'], status: 'starting', started_at: minsAgo(0), ended_at: null, incoming_count: 0, pending_count: 0, result: null, comment: null, recorded: 1, ticket_id: null, team: [] },
    { client_name: 'Джек Линтон', agent_id: ids['Джек Линтон'], status: 'break', started_at: minsAgo(17), ended_at: null, incoming_count: 0, pending_count: 0, result: null, comment: null, recorded: 0, ticket_id: null, team: [] },
    { client_name: 'Самуэль Уотерс', agent_id: ids['Самуэль Уотерс'], status: 'break', started_at: minsAgo(369), ended_at: null, incoming_count: 0, pending_count: 0, result: null, comment: null, recorded: 0, ticket_id: null, team: [] },
    { client_name: 'Генри Мерсер', agent_id: ids['Генри Мерсер'], status: 'break', started_at: minsAgo(640), ended_at: null, incoming_count: 0, pending_count: 0, result: null, comment: null, recorded: 0, ticket_id: null, team: [] },
  ];
  const startEnd = (daysBack, durationMins) => ({
    started_at: new Date(now.getTime() - daysBack * 86400000 - durationMins * 60000).toISOString(),
    ended_at: new Date(now.getTime() - daysBack * 86400000).toISOString(),
  });
  const historyCalls = [
    { client_name: 'Пётр Абрамов', agent_id: ids['Иван Петров'], status: 'ended', ...startEnd(0, 6), incoming_count: 1, pending_count: 0, result: 'Решено', comment: 'Клиент доволен решением', recorded: 1, ticket_id: ticketId('85374'), team: [] },
    { client_name: 'ООО «Вектор»', agent_id: ids['Мария Соколова'], status: 'ended', ...startEnd(1, 2), incoming_count: 1, pending_count: 0, result: 'Перенос', comment: 'Клиент попросил перезвонить позже', recorded: 1, ticket_id: null, team: [] },
    { client_name: 'Кузнецов Д.И.', agent_id: ids['Артём Ким'], status: 'ended', ...startEnd(1, 11), incoming_count: 1, pending_count: 0, result: 'Не решено', comment: 'Требуется эскалация в техотдел', recorded: 0, ticket_id: ticketId('85198'), team: [] },
    { client_name: 'ИП Соколова', agent_id: ids['Ольга Новак'], status: 'ended', ...startEnd(2, 4), incoming_count: 1, pending_count: 0, result: 'Решено', comment: '', recorded: 1, ticket_id: null, team: [] },
  ];
  for (const c of [...ongoingCalls, ...historyCalls]) {
    const { team, ...row } = c;
    const { lastInsertRowid: callId } = insertCall.run(row);
    for (const name of team) insertCallTeam.run(callId, ids[name]);
  }

  console.log('Seeded database with initial data.');
}

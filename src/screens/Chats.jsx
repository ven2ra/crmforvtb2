import React, { useState } from 'react';
import { Avatar } from '../components/core/Avatar.jsx';
import { Input } from '../components/forms/Input.jsx';
import { Icon } from '../components/core/Icon.jsx';
import { IconButton } from '../components/core/IconButton.jsx';
import { Badge } from '../components/core/Badge.jsx';
import { Tag } from '../components/feedback/Tag.jsx';
import { Tabs } from '../components/navigation/Tabs.jsx';
import { Button } from '../components/core/Button.jsx';

const CHATS = [
  { name: 'Мария Соколова', last: 'Отправила документы по заказу', time: '10:42', unread: 2, status: 'Активные', ticket: '85374' },
  { name: 'ООО «Вектор»', last: 'Спасибо, ожидаю обновление', time: '09:58', unread: 0, status: 'Активные', ticket: null },
  { name: 'Артём Ким', last: 'Клиент подтвердил возврат', time: 'Вчера', unread: 1, status: 'Активные', ticket: '85198' },
  { name: 'Техподдержка L2', last: 'Передал тикет №85212 дальше', time: 'Вчера', unread: 0, status: 'Закрытые', ticket: '85212' },
  { name: 'Кузнецов Д.И.', last: 'Спор закрыт, спасибо за помощь', time: '28.08', unread: 0, status: 'Закрытые', ticket: '85033' },
];
const MESSAGES = [
  { me: false, text: 'Добрый день! Уточните, пожалуйста, статус по заказу №2291.', time: '10:30' },
  { me: true, text: 'Добрый день! Проверяю, минуту.', time: '10:31' },
  { me: true, text: 'Возврат оформлен, средства поступят в течение 3 рабочих дней.', time: '10:41' },
  { me: false, text: 'Отправила документы по заказу', time: '10:42' },
];

export function Chats() {
  const [filter, setFilter] = useState('Активные');
  const visible = CHATS.filter(c => c.status === filter);
  const [active, setActive] = useState(0);
  const [notesOpen, setNotesOpen] = useState(true);
  const [tags, setTags] = useState(['Приоритетный клиент', 'Возврат']);
  const cur = visible[Math.min(active, visible.length - 1)] || CHATS[0];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: notesOpen ? '320px 1fr 260px' : '320px 1fr', height: '100%' }}>
      <div style={{ borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 20px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input icon="search" placeholder="Поиск чатов" />
          <Tabs items={['Активные', 'Закрытые']} active={filter} onChange={v => { setFilter(v); setActive(0); }} />
        </div>
        <div style={{ overflowY: 'auto' }}>
          {visible.map((c, i) => (
            <div key={c.name} onClick={() => setActive(i)} className="row-hover" style={{ display: 'flex', gap: 12, padding: '12px 20px', cursor: 'pointer', background: active === i ? 'var(--bg-surface-2)' : 'transparent' }}>
              <Avatar name={c.name} status={filter === 'Активные' && i === 0 ? 'online' : undefined} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>{c.name}</span><span style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>{c.time}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ font: 'var(--text-caption)', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.last}</span>{c.unread > 0 && <Badge tone="accent">{c.unread}</Badge>}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={cur.name} status="online" ring />
          <div style={{ flex: 1 }}>
            <div style={{ font: 'var(--text-h3)', fontWeight: 700, color: 'var(--text-primary)' }}>{cur.name}</div>
            {cur.ticket && <Badge tone="accent" dot>Обращение №{cur.ticket}</Badge>}
          </div>
          <IconButton icon={<Icon name="filter" />} active={notesOpen} onClick={() => setNotesOpen(o => !o)} />
        </div>
        <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
          {MESSAGES.map((m, i) => (
            <div key={i} style={{ alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: '60%', background: m.me ? 'var(--accent)' : 'var(--bg-surface-2)', color: m.me ? '#fff' : 'var(--text-primary)', borderRadius: 'var(--radius-lg)', padding: '10px 14px', font: 'var(--text-body-sm)' }}>
              {m.text}
              <div style={{ font: 'var(--text-caption)', opacity: .7, marginTop: 4, textAlign: 'right' }}>{m.time}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <Input placeholder={filter === 'Закрытые' ? 'Чат закрыт' : 'Написать сообщение...'} style={{ flex: 1 }} />
          <IconButton icon={<Icon name="arrowUpRight" />} active disabled={filter === 'Закрытые'} />
        </div>
      </div>
      {notesOpen && (
        <div style={{ borderLeft: '1px solid var(--border-subtle)', padding: 20, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
          <div>
            <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Привязка</div>
            {cur.ticket ? <Badge tone="accent" dot>Обращение №{cur.ticket}</Badge> : <Button variant="secondary" size="sm">Привязать к обращению</Button>}
          </div>
          <div>
            <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Теги оператора</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {tags.map(t => (<Tag key={t} onRemove={() => setTags(tags.filter(x => x !== t))}>{t}</Tag>))}
            </div>
          </div>
          <div>
            <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Внутренняя заметка</div>
            <textarea placeholder="Видна только операторам..." style={{ width: '100%', minHeight: 100, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10, color: 'var(--text-primary)', font: 'var(--text-body-sm)', resize: 'vertical' }} />
          </div>
        </div>
      )}
    </div>
  );
}

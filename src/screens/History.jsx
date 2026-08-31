import React from 'react';
import { Select } from '../components/forms/Select.jsx';
import { Badge } from '../components/core/Badge.jsx';
import { Avatar } from '../components/core/Avatar.jsx';

const ROWS = [
  { id: '85212', subject: 'Ошибка авторизации в кабинете', client: 'ООО «Технополис»', owner: 'Ольга Новак', closed: '29.08.2026', duration: '2ч 10м', rating: 5 },
  { id: '85033', subject: 'Некорректная сумма в счёте', client: 'Кузнецов Д.И.', owner: 'Иван Петров', closed: '26.08.2026', duration: '45м', rating: 4 },
  { id: '84980', subject: 'Задержка доставки на 3 дня', client: 'ИП Соколова', owner: 'Мария Соколова', closed: '24.08.2026', duration: '1д 2ч', rating: 3 },
  { id: '84902', subject: 'Вопрос по тарифам обслуживания', client: 'ООО «Вектор»', owner: 'Артём Ким', closed: '20.08.2026', duration: '20м', rating: 5 },
];

export function History() {
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ font: 'var(--text-display)', fontWeight: 800, color: 'var(--text-primary)' }}>История обращений</div>
        <Select options={[{ value: '30', label: 'За 30 дней' }, { value: '90', label: 'За 90 дней' }, { value: 'all', label: 'За всё время' }]} value="30" />
      </div>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px 2fr 1.2fr 1fr 110px 90px 90px', gap: 12, padding: '12px 20px', font: 'var(--text-caption)', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}>
          <span>№</span><span>Тема</span><span>Клиент</span><span>Ответственный</span><span>Закрыто</span><span>Время</span><span>Оценка</span>
        </div>
        {ROWS.map(r => (
          <div key={r.id} className="row-hover" style={{ display: 'grid', gridTemplateColumns: '80px 2fr 1.2fr 1fr 110px 90px 90px', gap: 12, padding: '14px 20px', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', font: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>{r.id}</span>
            <span>{r.subject}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{r.client}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar name={r.owner} size={22} /><span style={{ font: 'var(--text-caption)' }}>{r.owner}</span></div>
            <span style={{ color: 'var(--text-tertiary)' }}>{r.closed}</span>
            <span style={{ color: 'var(--text-tertiary)' }}>{r.duration}</span>
            <Badge tone="success">{'★'.repeat(r.rating)}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

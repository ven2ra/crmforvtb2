import React, { useEffect, useState } from 'react';
import { Badge } from '../components/core/Badge.jsx';
import { Avatar } from '../components/core/Avatar.jsx';
import { api } from '../lib/api.js';

export function History() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getTicketHistory()
      .then(setRows)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ font: 'var(--text-display)', fontWeight: 800, color: 'var(--text-primary)' }}>История обращений</div>
      </div>
      {error && <div style={{ color: 'var(--danger)', font: 'var(--text-body-sm)' }}>{error}</div>}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px 2fr 1.2fr 1fr 110px 90px 90px', gap: 12, padding: '12px 20px', font: 'var(--text-caption)', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}>
          <span>№</span><span>Тема</span><span>Клиент</span><span>Ответственный</span><span>Закрыто</span><span>Время</span><span>Оценка</span>
        </div>
        {loading && <div style={{ padding: 20, color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>Загрузка…</div>}
        {!loading && rows.length === 0 && <div style={{ padding: 20, color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>Закрытых обращений пока нет</div>}
        {rows.map(r => (
          <div key={r.id} className="row-hover" style={{ display: 'grid', gridTemplateColumns: '80px 2fr 1.2fr 1fr 110px 90px 90px', gap: 12, padding: '14px 20px', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', font: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>{r.id}</span>
            <span>{r.subject}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{r.client}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar name={r.owner || '?'} size={22} /><span style={{ font: 'var(--text-caption)' }}>{r.owner}</span></div>
            <span style={{ color: 'var(--text-tertiary)' }}>{r.closed}</span>
            <span style={{ color: 'var(--text-tertiary)' }}>{r.duration}</span>
            <Badge tone="success">{r.rating ? '★'.repeat(r.rating) : '—'}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

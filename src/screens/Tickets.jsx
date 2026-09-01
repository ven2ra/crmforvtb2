import React, { useEffect, useState, useCallback } from 'react';
import { Tabs } from '../components/navigation/Tabs.jsx';
import { Input } from '../components/forms/Input.jsx';
import { Button } from '../components/core/Button.jsx';
import { Badge } from '../components/core/Badge.jsx';
import { Avatar } from '../components/core/Avatar.jsx';
import { TicketPage } from '../components/ticket/TicketPage.jsx';
import { api } from '../lib/api.js';

const TONE_MAP = { Новое: 'accent', 'В работе': 'warning', Закрыто: 'success' };

export function Tickets({ openTicketId, onOpenTicketIdChange }) {
  const [filter, setFilter] = useState('Все');
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailId, setDetailId] = useState(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api.getTickets(filter)
      .then(data => { setRows(data); setError(null); })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => { if (detailId == null) load(); }, [load, detailId]);

  useEffect(() => {
    if (openTicketId != null) {
      setDetailId(openTicketId);
      onOpenTicketIdChange?.(null);
    }
  }, [openTicketId, onOpenTicketIdChange]);

  const visible = rows.filter(r =>
    !search.trim() ||
    r.fio.toLowerCase().includes(search.trim().toLowerCase()) ||
    r.agreement.toLowerCase().includes(search.trim().toLowerCase())
  );

  const createTicket = async () => {
    setCreating(true);
    try {
      const t = await api.createTicket({});
      setDetailId(t.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  if (detailId != null) {
    return <TicketPage ticketId={detailId} onExit={() => setDetailId(null)} onChanged={load} />;
  }

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ font: 'var(--text-display)', fontWeight: 800, color: 'var(--text-primary)' }}>Обращения</div>
        <Button variant="primary" onClick={createTicket} disabled={creating}>{creating ? 'Создание…' : '+ Новое обращение'}</Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs items={['Все', 'Новые', 'В работе', 'Закрытые']} active={filter} onChange={setFilter} />
        <Input icon="search" placeholder="Поиск по ФИО или номеру соглашения" style={{ width: 300 }} value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      {error && <div style={{ color: 'var(--danger)', font: 'var(--text-body-sm)' }}>{error}</div>}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px 1.6fr 1fr 1.2fr 1fr 110px 90px', gap: 12, padding: '12px 20px', font: 'var(--text-caption)', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}>
          <span>№</span><span>ФИО клиента</span><span>№ соглашения</span><span>Тематика</span><span>№ SD</span><span>Статус</span><span>Дата</span>
        </div>
        {loading && <div style={{ padding: 20, color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>Загрузка…</div>}
        {!loading && visible.length === 0 && <div style={{ padding: 20, color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>Обращений не найдено</div>}
        {visible.map(r => (
          <div
            key={r.id}
            onClick={() => setDetailId(r.id)}
            className="row-hover"
            style={{ display: 'grid', gridTemplateColumns: '80px 1.6fr 1fr 1.2fr 1fr 110px 90px', gap: 12, padding: '14px 20px', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', font: 'var(--text-body-sm)', color: 'var(--text-primary)', cursor: 'pointer' }}
          >
            <span style={{ color: 'var(--text-tertiary)' }}>{r.number}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar name={r.owner || '?'} size={22} /><span>{r.fio || 'Без имени'}</span></div>
            <span style={{ color: 'var(--text-secondary)' }}>{r.agreement || '—'}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{r.topic || '—'}</span>
            <span style={{ color: r.sd === 'Запрос в ПП' ? 'var(--text-tertiary)' : 'var(--text-primary)' }}>{r.sd}</span>
            <Badge tone={TONE_MAP[r.status]} dot>{r.status}</Badge>
            <span style={{ color: 'var(--text-tertiary)' }}>{r.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState, useCallback } from 'react';
import { Tabs } from '../components/navigation/Tabs.jsx';
import { Input } from '../components/forms/Input.jsx';
import { Select } from '../components/forms/Select.jsx';
import { Button } from '../components/core/Button.jsx';
import { Badge } from '../components/core/Badge.jsx';
import { Avatar } from '../components/core/Avatar.jsx';
import { Dialog } from '../components/overlay/Dialog.jsx';
import { api } from '../lib/api.js';

const TONE_MAP = { Новое: 'accent', 'В работе': 'warning', Закрыто: 'success' };
const EMPTY_FORM = { fio: '', agreement: '', topic: '', essence: '', sd: '' };

export function Tickets() {
  const [filter, setFilter] = useState('Все');
  const [rows, setRows] = useState([]);
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const load = useCallback(() => {
    setLoading(true);
    api.getTickets(filter)
      .then(data => { setRows(data); setError(null); })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { api.getTicketTopics().then(setTopics).catch(() => {}); }, []);

  const visible = rows.filter(r =>
    !search.trim() ||
    r.fio.toLowerCase().includes(search.trim().toLowerCase()) ||
    r.agreement.toLowerCase().includes(search.trim().toLowerCase())
  );

  const submit = async () => {
    if (!form.fio.trim()) return;
    setSubmitting(true);
    try {
      await api.createTicket(form);
      setOpen(false);
      setForm(EMPTY_FORM);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ font: 'var(--text-display)', fontWeight: 800, color: 'var(--text-primary)' }}>Обращения</div>
        <Button variant="primary" onClick={() => setOpen(true)}>+ Новое обращение</Button>
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
          <div key={r.id} className="row-hover" style={{ display: 'grid', gridTemplateColumns: '80px 1.6fr 1fr 1.2fr 1fr 110px 90px', gap: 12, padding: '14px 20px', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', font: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>{r.number}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar name={r.owner || '?'} size={22} /><span>{r.fio}</span></div>
            <span style={{ color: 'var(--text-secondary)' }}>{r.agreement || '—'}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{r.topic}</span>
            <span style={{ color: r.sd === 'Запрос в ПП' ? 'var(--text-tertiary)' : 'var(--text-primary)' }}>{r.sd}</span>
            <Badge tone={TONE_MAP[r.status]} dot>{r.status}</Badge>
            <span style={{ color: 'var(--text-tertiary)' }}>{r.date}</span>
          </div>
        ))}
      </div>
      <Dialog open={open} title="Новое обращение" onClose={() => setOpen(false)} style={{ width: 480 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input label="ФИО клиента" placeholder="Иванов Иван Иванович" value={form.fio} onChange={e => setForm({ ...form, fio: e.target.value })} />
          <Input label="Номер соглашения" placeholder="СГ-0000/00" value={form.agreement} onChange={e => setForm({ ...form, agreement: e.target.value })} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-secondary)', fontWeight: 600 }}>Тематика обращения</span>
            <Select options={topics.map(t => ({ value: t, label: t }))} value={form.topic || topics[0]} onChange={v => setForm({ ...form, topic: v })} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-secondary)', fontWeight: 600 }}>Суть обращения</span>
            <textarea placeholder="Опишите суть обращения клиента..." value={form.essence} onChange={e => setForm({ ...form, essence: e.target.value })} style={{ width: '100%', minHeight: 90, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10, color: 'var(--text-primary)', font: 'var(--text-body-sm)', resize: 'vertical' }} />
          </div>
          <Input placeholder="Номер SD — если нет, оставьте пустым" value={form.sd} onChange={e => setForm({ ...form, sd: e.target.value })} />
          {!form.sd && <span style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>Без номера SD будет автоматически подставлено: «Запрос в ПП»</span>}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
            <Button variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
            <Button variant="primary" onClick={submit} disabled={submitting || !form.fio.trim()}>{submitting ? 'Создание…' : 'Создать'}</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

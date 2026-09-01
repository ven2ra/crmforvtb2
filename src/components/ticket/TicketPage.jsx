import React, { useEffect, useState } from 'react';
import { Badge } from '../core/Badge.jsx';
import { Avatar } from '../core/Avatar.jsx';
import { Select } from '../forms/Select.jsx';
import { Input } from '../forms/Input.jsx';
import { Button } from '../core/Button.jsx';
import { api } from '../../lib/api.js';

const STATUS_OPTIONS = [{ value: 'Новое', label: 'Новое' }, { value: 'В работе', label: 'В работе' }, { value: 'Закрыто', label: 'Закрыто' }];

// Отдельная страница обращения: и для только что созданного (поля ещё
// пустые, дозаполняются по ходу и автосохраняются), и для просмотра/
// редактирования существующего — используется один и тот же компонент.
export function TicketPage({ ticketId, onExit, onChanged }) {
  const [ticket, setTicket] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [reassigning, setReassigning] = useState(false);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const [fio, setFio] = useState('');
  const [agreement, setAgreement] = useState('');
  const [topic, setTopic] = useState('');
  const [essence, setEssence] = useState('');
  const [sd, setSd] = useState('');

  useEffect(() => {
    let cancelled = false;
    api.getTicket(ticketId).then(t => {
      if (cancelled) return;
      setTicket(t);
      setFio(t.fio);
      setAgreement(t.agreement);
      setTopic(t.topic);
      setEssence(t.essence);
      setSd(t.sd === 'Запрос в ПП' ? '' : t.sd);
    }).catch(err => setError(err.message));
    return () => { cancelled = true; };
  }, [ticketId]);

  useEffect(() => { api.getEmployees().then(setEmployees).catch(() => {}); }, []);

  const patch = (data) => {
    api.updateTicket(ticketId, data).then(t => { setTicket(t); onChanged?.(); }).catch(err => setError(err.message));
  };

  const changeStatus = async (status) => {
    setBusy(true);
    try {
      const updated = await api.updateTicket(ticketId, { status });
      setTicket(updated);
      onChanged?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const reassign = async (ownerId) => {
    setBusy(true);
    try {
      const updated = await api.updateTicket(ticketId, { ownerId: Number(ownerId) });
      setTicket(updated);
      setReassigning(false);
      onChanged?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!ticket) {
    return <div style={{ padding: 32, color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>{error || 'Загрузка…'}</div>;
  }

  return (
    <div style={{ padding: 32, display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button variant="ghost" size="sm" onClick={() => onExit()}>← К обращениям</Button>
          <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>Обращение №{ticket.number}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 24, boxShadow: 'var(--shadow-card)' }}>
          <Avatar name={fio || '?'} size={44} />
          <div style={{ flex: 1 }}>
            <Input
              placeholder="ФИО клиента"
              value={fio}
              onChange={e => setFio(e.target.value)}
              onBlur={() => patch({ fio })}
              style={{ font: 'var(--text-h3)', fontWeight: 700 }}
            />
            <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginTop: 4 }}>Создано {ticket.createdAt}</div>
          </div>
          <Select options={STATUS_OPTIONS} value={ticket.status} onChange={changeStatus} style={{ width: 150 }} />
        </div>

        {error && <div style={{ color: 'var(--danger)', font: 'var(--text-body-sm)' }}>{error}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <Input label="Номер соглашения" placeholder="СГ-0000/00" value={agreement} onChange={e => setAgreement(e.target.value)} onBlur={() => patch({ agreement })} />
            <Input label="Тематика обращения" placeholder="Например: Возврат средств" value={topic} onChange={e => setTopic(e.target.value)} onBlur={() => patch({ topic })} />
            <Input label="Номер SD" placeholder="Если нет — оставьте пустым" value={sd} onChange={e => setSd(e.target.value)} onBlur={() => patch({ sd })} />
          </div>
          {!sd && <span style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>Без номера SD подставлено: «Запрос в ПП» (срок ответа — 4 раб. дня вместо 5)</span>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-secondary)', fontWeight: 600 }}>Суть обращения</span>
            <textarea
              placeholder="Опишите суть обращения клиента..."
              value={essence}
              onChange={e => setEssence(e.target.value)}
              onBlur={() => patch({ essence })}
              style={{ width: '100%', minHeight: 90, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10, color: 'var(--text-primary)', font: 'var(--text-body-sm)', resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 4 }}>Срок ответа ({ticket.deadlineDays} раб. дня — {ticket.sd === 'Запрос в ПП' ? 'Запрос в ПП' : 'SD оформлен'})</div>
            <div style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>до {ticket.deadlineDate}</div>
          </div>
          {ticket.status === 'Закрыто' ? (
            <Badge tone={ticket.closedOnTime ? 'success' : 'danger'} dot>{ticket.closedOnTime ? 'Закрыто вовремя' : 'Закрыто с опозданием'}</Badge>
          ) : ticket.overdue ? (
            <Badge tone="danger" dot>Просрочено</Badge>
          ) : (
            <Badge tone="neutral" dot>В сроке</Badge>
          )}
        </div>

        <div>
          <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Ответственный</div>
          {!reassigning ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar name={ticket.owner || '?'} size={30} />
              <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', flex: 1 }}>{ticket.owner || 'Не назначен'}</span>
              <Button variant="ghost" size="sm" onClick={() => setReassigning(true)} disabled={busy}>Переназначить</Button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', maxWidth: 420 }}>
              <Select
                options={employees.map(e => ({ value: String(e.id), label: `${e.name} · ${e.department}${e.status === 'offline' ? ' (не на месте)' : ''}` }))}
                value={String(ticket.ownerId || '')}
                onChange={reassign}
                style={{ flex: 1 }}
              />
              <Button variant="ghost" size="sm" onClick={() => setReassigning(false)}>Отмена</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

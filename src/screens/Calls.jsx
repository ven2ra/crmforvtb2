import React, { useEffect, useState, useCallback } from 'react';
import { Icon } from '../components/core/Icon.jsx';
import { Avatar, AvatarStack } from '../components/core/Avatar.jsx';
import { Badge } from '../components/core/Badge.jsx';
import { Tabs } from '../components/navigation/Tabs.jsx';
import { IconButton } from '../components/core/IconButton.jsx';
import { Button } from '../components/core/Button.jsx';
import { Dialog } from '../components/overlay/Dialog.jsx';
import { Select } from '../components/forms/Select.jsx';
import { Input } from '../components/forms/Input.jsx';
import { StartCallDialog } from '../components/call/StartCallDialog.jsx';
import { NewTicketDialog } from '../components/ticket/NewTicketDialog.jsx';
import { api } from '../lib/api.js';

const RESULT_TONE = { Решено: 'success', 'Не решено': 'danger', Перенос: 'warning' };
const RESULT_OPTIONS = [{ value: 'Решено', label: 'Решено' }, { value: 'Не решено', label: 'Не решено' }, { value: 'Перенос', label: 'Перенос' }];

export function Calls() {
  const [view, setView] = useState('Текущие');
  const [current, setCurrent] = useState({ ongoing: [], starting: [], onBreak: [] });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wrapup, setWrapup] = useState(null);
  const [wrapResult, setWrapResult] = useState('Решено');
  const [wrapComment, setWrapComment] = useState('');
  const [createTicket, setCreateTicket] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [ticketPrefill, setTicketPrefill] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    const req = view === 'Текущие' ? api.getCalls('ongoing') : api.getCalls('history');
    req.then(data => {
      if (view === 'Текущие') setCurrent(data); else setHistory(data);
      setError(null);
    }).catch(err => setError(err.message)).finally(() => setLoading(false));
  }, [view]);

  useEffect(() => { load(); }, [load]);

  const openWrapup = (call) => {
    setWrapup(call);
    setWrapResult('Решено');
    setWrapComment('');
    setCreateTicket(false);
  };

  const submitWrapup = async () => {
    setSubmitting(true);
    try {
      await api.wrapupCall(wrapup.id, { result: wrapResult, comment: wrapComment, createTicket, ticketFio: wrapup.name });
      setWrapup(null);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '2.4fr 1fr', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ font: 'var(--text-display)', fontWeight: 800, color: 'var(--text-primary)' }}>Звонки</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Tabs items={['Текущие', 'История']} active={view} onChange={setView} />
            <Button variant="primary" onClick={() => setStartOpen(true)}>+ Начать звонок</Button>
          </div>
        </div>
        {error && <div style={{ color: 'var(--danger)', font: 'var(--text-body-sm)' }}>{error}</div>}
        {loading && <div style={{ color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>Загрузка…</div>}
        {!loading && view === 'Текущие' ? (
          <React.Fragment>
            <div style={{ font: 'var(--text-h3)', fontWeight: 700, color: 'var(--text-primary)' }}>Текущие звонки</div>
            {current.ongoing.length === 0 && <div style={{ color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>Нет активных звонков</div>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              {current.ongoing.map(c => (
                <div key={c.id} className="lift" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 16, display: 'flex', flexDirection: 'column', gap: 10, boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={c.name} status="busy" />
                    <div><div style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>{c.name}</div><div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>{c.duration}</div></div>
                  </div>
                  <div style={{ display: 'flex', gap: 14, font: 'var(--text-caption)', color: 'var(--text-secondary)', alignItems: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="phone" size={12} />{c.incoming}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="clock" size={12} />{c.pending}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <AvatarStack names={c.team} size={22} />
                    <span style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>ID {c.id}</span>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => openWrapup(c)}>Завершить звонок</Button>
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : !loading && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1.4fr 1fr 1.2fr 90px 110px 90px', gap: 12, padding: '12px 20px', font: 'var(--text-caption)', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}>
              <span>Запись</span><span>Клиент</span><span>Оператор</span><span>Дата</span><span>Длит.</span><span>Итог</span><span>Тикет</span>
            </div>
            {history.length === 0 && <div style={{ padding: 20, color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>История пуста</div>}
            {history.map(h => (
              <div key={h.id} className="row-hover" style={{ display: 'grid', gridTemplateColumns: '90px 1.4fr 1fr 1.2fr 90px 110px 90px', gap: 12, padding: '14px 20px', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', font: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: h.rec ? 'var(--accent-hover)' : 'var(--text-tertiary)' }}><Icon name="video" size={14} />{h.rec ? 'есть' : 'нет'}</span>
                <div>
                  <div>{h.name}</div>
                  {(h.malfunction || h.transferCorrect === false) && (
                    <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                      {h.malfunction && <Badge tone="danger">Сбой</Badge>}
                      {h.transferCorrect === false && <Badge tone="danger">Некорр. перевод</Badge>}
                    </div>
                  )}
                </div>
                <span style={{ color: 'var(--text-secondary)' }}>{h.agent || '—'}</span>
                <span style={{ color: 'var(--text-tertiary)' }}>{h.date}</span>
                <span style={{ color: 'var(--text-tertiary)' }}>{h.duration}</span>
                {h.result ? <Badge tone={RESULT_TONE[h.result]} dot>{h.result}</Badge> : <span style={{ color: 'var(--text-tertiary)' }}>—</span>}
                {h.ticket ? <Badge tone="accent">№{h.ticket}</Badge> : <span style={{ color: 'var(--text-tertiary)' }}>—</span>}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ font: 'var(--text-h3)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Начинаются звонки</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {current.starting.length === 0 && <div style={{ color: 'var(--text-tertiary)', font: 'var(--text-caption)' }}>Нет ожидающих звонков</div>}
            {current.starting.map(n => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10 }}>
                <Avatar name={n} size={30} /><span style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', flex: 1 }}>{n}</span><IconButton icon={<Icon name="phone" />} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ font: 'var(--text-h3)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>На перерыве</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {current.onBreak.length === 0 && <div style={{ color: 'var(--text-tertiary)', font: 'var(--text-caption)' }}>Никого нет на перерыве</div>}
            {current.onBreak.map(([n, t]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10 }}>
                <Avatar name={n} size={30} status="offline" /><span style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', flex: 1 }}>{n}</span><Badge tone="warning">{t}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={!!wrapup} title={wrapup ? 'Завершение звонка — ' + wrapup.name : ''} onClose={() => setWrapup(null)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Select options={RESULT_OPTIONS} value={wrapResult} onChange={setWrapResult} />
          <Input placeholder="Комментарий по звонку" value={wrapComment} onChange={e => setWrapComment(e.target.value)} />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', marginTop: 8, alignItems: 'center' }}>
            <Button variant="ghost" onClick={() => setCreateTicket(v => !v)}>{createTicket ? '✓ Обращение будет создано' : 'Создать обращение из звонка'}</Button>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="ghost" onClick={() => setWrapup(null)}>Отмена</Button>
              <Button variant="primary" onClick={submitWrapup} disabled={submitting}>{submitting ? 'Сохранение…' : 'Сохранить'}</Button>
            </div>
          </div>
        </div>
      </Dialog>
      <StartCallDialog
        open={startOpen}
        onClose={() => setStartOpen(false)}
        onLogged={() => { setStartOpen(false); load(); }}
        onNeedsTicket={(prefill) => { setStartOpen(false); setTicketPrefill(prefill); }}
      />
      <NewTicketDialog
        open={!!ticketPrefill}
        initial={ticketPrefill}
        source={ticketPrefill ? { callId: ticketPrefill.callId } : undefined}
        onClose={() => setTicketPrefill(null)}
        onCreated={() => { setTicketPrefill(null); load(); }}
      />
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../forms/Input.jsx';
import { Button } from '../core/Button.jsx';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../core/Badge.jsx';
import { YesNoToggle } from '../common/YesNoToggle.jsx';
import { api } from '../../lib/api.js';

function formatElapsed(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = n => String(n).padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

// Отдельная "живая" страница текущего звонка: секундомер идёт с момента
// нажатия "Начать звонок", данные по звонку дозаполняются и автосохраняются
// по ходу разговора, пока оператор не нажмёт "Завершить звонок".
export function CallLivePage({ callId, onExit, onFinished }) {
  const [call, setCall] = useState(null);
  const [phone, setPhone] = useState('');
  const [agreement, setAgreement] = useState('');
  const [topic, setTopic] = useState('');
  const [essence, setEssence] = useState('');
  const [now, setNow] = useState(Date.now());
  const [finishing, setFinishing] = useState(false);
  const [error, setError] = useState(null);
  const startedAtRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    api.getCall(callId).then(c => {
      if (cancelled) return;
      setCall(c);
      setPhone(c.phone);
      setAgreement(c.agreement);
      setTopic(c.topic);
      setEssence(c.essence);
      startedAtRef.current = new Date(c.startedAt).getTime();
    }).catch(err => setError(err.message));
    return () => { cancelled = true; };
  }, [callId]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const patch = (data) => {
    api.updateCall(callId, data).then(setCall).catch(err => setError(err.message));
  };

  if (!call) {
    return <div style={{ padding: 32, color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>{error || 'Загрузка…'}</div>;
  }

  const elapsed = startedAtRef.current ? formatElapsed(now - startedAtRef.current) : '00:00';

  const finish = async () => {
    setFinishing(true);
    try {
      await api.updateCall(callId, { phone, agreement, topic, essence });
      const finished = await api.finishCall(callId);
      if (finished.requiresTicket) {
        onFinished({ callId, fio: phone.trim(), agreement, topic, essence });
      } else {
        onFinished(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setFinishing(false);
    }
  };

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 640 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Button variant="ghost" size="sm" onClick={() => onExit()}>← К звонкам</Button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 24, boxShadow: 'var(--shadow-glow-accent)' }}>
        <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-circle)', background: 'var(--grad-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="phone" size={24} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>Звонок идёт</div>
          <div style={{ font: 'var(--text-display)', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', letterSpacing: '.02em' }}>{elapsed}</div>
        </div>
        <Badge tone="accent" dot>В разговоре</Badge>
      </div>

      {error && <div style={{ color: 'var(--danger)', font: 'var(--text-body-sm)' }}>{error}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Input label="Номер телефона звонящего" placeholder="+7 900 123-45-67" value={phone} onChange={e => setPhone(e.target.value)} onBlur={() => patch({ phone })} />
        <Input
          label="Номер соглашения"
          placeholder="11MD3A"
          value={agreement}
          maxLength={6}
          onChange={e => setAgreement(e.target.value.toUpperCase())}
          onBlur={() => patch({ agreement })}
        />
        <Input label="Тематика обращения" placeholder="Например: Возврат средств" value={topic} onChange={e => setTopic(e.target.value)} onBlur={() => patch({ topic })} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-secondary)', fontWeight: 600 }}>Суть вопроса</span>
          <textarea
            placeholder="Опишите суть вопроса клиента..."
            value={essence}
            onChange={e => setEssence(e.target.value)}
            onBlur={() => patch({ essence })}
            style={{ width: '100%', minHeight: 90, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 10, color: 'var(--text-primary)', font: 'var(--text-body-sm)', resize: 'vertical' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 14 }}>
        <YesNoToggle label="Это клиент?" value={call.isClient} onChange={v => patch({ isClient: v })} />
        <YesNoToggle label="Перевод корректный?" value={call.transferCorrect} onChange={v => patch({ transferCorrect: v })} badSide="no" />
        <YesNoToggle label="Сбой?" value={call.malfunction} onChange={v => patch({ malfunction: v })} badSide="yes" />
        <YesNoToggle label="Требуется обращение?" value={call.requiresTicket} onChange={v => patch({ requiresTicket: v })} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="primary" onClick={finish} disabled={finishing}>
          {finishing ? 'Завершение…' : call.requiresTicket ? 'Завершить и создать обращение' : 'Завершить звонок'}
        </Button>
      </div>
    </div>
  );
}

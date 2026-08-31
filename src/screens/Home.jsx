import React, { useEffect, useState } from 'react';
import { StatCard } from '../components/data/StatCard.jsx';
import { ProgressBar } from '../components/data/ProgressBar.jsx';
import { Tabs } from '../components/navigation/Tabs.jsx';
import { Badge } from '../components/core/Badge.jsx';
import { Avatar } from '../components/core/Avatar.jsx';
import { api } from '../lib/api.js';

function trendDirection(trend) {
  if (!trend || trend.length < 2) return 'up';
  return trend[trend.length - 1] >= trend[0] ? 'up' : 'down';
}

export function Home() {
  const [range, setRange] = useState('День');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api.getStats()
      .then(data => { if (!cancelled) setStats(data); })
      .catch(err => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, []);

  if (error) {
    return <div style={{ padding: 32, color: 'var(--danger)' }}>Не удалось загрузить данные: {error}</div>;
  }
  if (!stats) {
    return <div style={{ padding: 32, color: 'var(--text-secondary)' }}>Загрузка…</div>;
  }

  const deptColors = { 'Продажи': 'var(--accent)', 'Поддержка': 'var(--success)', 'Техотдел': 'var(--warning)' };

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ font: 'var(--text-display)', fontWeight: 800, color: 'var(--text-primary)' }}>Доброе утро, Иван</div>
          <div style={{ font: 'var(--text-body)', color: 'var(--text-secondary)', marginTop: 4 }}>{stats.date} · {stats.onlineEmployees} из {stats.totalEmployees} сотрудников на месте</div>
        </div>
        <Tabs items={['День', 'Неделя', 'Месяц']} active={range} onChange={setRange} />
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <div className="lift" style={{ flex: 1 }}><StatCard label="Активных обращений" value={String(stats.activeTickets)} deltaDirection={trendDirection(stats.ticketsTrend)} trend={stats.ticketsTrend} /></div>
        <div className="lift" style={{ flex: 1 }}><StatCard label="Звонков сегодня" value={String(stats.callsToday)} deltaDirection={trendDirection(stats.callsTrend)} trend={stats.callsTrend} /></div>
        <div className="lift" style={{ flex: 1 }}><StatCard label="Открытых чатов" value={String(stats.openChats)} deltaDirection={trendDirection(stats.chatsTrend)} trend={stats.chatsTrend} /></div>
        <div className="lift" style={{ flex: 1 }}><StatCard label="Среднее время ответа" value={stats.avgResponse} accent="var(--danger)" /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        <div className="lift" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 20, boxShadow: 'var(--shadow-card)' }}>
          <div style={{ font: 'var(--text-h3)', color: 'var(--text-primary)', fontWeight: 700, marginBottom: 16 }}>Нагрузка по отделам</div>
          {stats.departments.length === 0 && <div style={{ color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>Нет открытых обращений</div>}
          {stats.departments.map(d => (
            <div key={d.name} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--text-body-sm)', color: 'var(--text-secondary)', marginBottom: 6 }}><span>{d.name}</span><span>{d.load}%</span></div>
              <ProgressBar value={d.load} color={deptColors[d.name] || 'var(--accent)'} />
            </div>
          ))}
        </div>
        <div className="lift" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 20, boxShadow: 'var(--shadow-card)' }}>
          <div style={{ font: 'var(--text-h3)', color: 'var(--text-primary)', fontWeight: 700, marginBottom: 16 }}>Мои ближайшие</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {stats.upcoming.length === 0 && <div style={{ color: 'var(--text-tertiary)', font: 'var(--text-body-sm)' }}>Нет запланированных дел</div>}
            {stats.upcoming.map((u, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ font: 'var(--text-body-sm)', color: 'var(--text-tertiary)', width: 44 }}>{u.time}</div>
                <Avatar name={u.person} size={28} />
                <div style={{ flex: 1 }}>
                  <div style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>{u.title}</div>
                  <div style={{ marginTop: 4 }}><Badge tone="neutral">{u.type}</Badge></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

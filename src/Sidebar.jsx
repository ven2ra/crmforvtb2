import React from 'react';
import { NavItem } from './components/navigation/NavItem.jsx';
import { Icon } from './components/core/Icon.jsx';
import { Avatar } from './components/core/Avatar.jsx';

const ITEMS = [
  { key: 'home', icon: 'home', label: 'Главная' },
  { key: 'tickets', icon: 'inbox', label: 'Обращения' },
  { key: 'calls', icon: 'phone', label: 'Звонки' },
  { key: 'chats', icon: 'message', label: 'Чаты' },
  { key: 'history', icon: 'clock', label: 'История' },
];

export function Sidebar({ active, onNav }) {
  return (
    <div style={{ width: 240, background: 'var(--bg-surface)', borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', padding: '20px 14px', gap: 4, height: '100%', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px 20px' }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--grad-accent)' }} />
        <span style={{ font: 'var(--text-h3)', fontWeight: 800, color: 'var(--text-primary)' }}>ЕРС</span>
      </div>
      {ITEMS.map(it => (
        <NavItem key={it.key} icon={<Icon name={it.icon} />} label={it.label} active={active === it.key} onClick={() => onNav(it.key)} />
      ))}
      <div style={{ flex: 1 }} />
      <NavItem icon={<Icon name="settings" />} label="Настройки" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 10px 0', borderTop: '1px solid var(--border-subtle)', marginTop: 8 }}>
        <Avatar name="Иван Петров" status="online" size={32} ring />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>Иван Петров</span>
          <span style={{ font: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>Оператор</span>
        </div>
      </div>
    </div>
  );
}

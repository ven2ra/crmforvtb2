import React from 'react';
export function NavItem({ icon, label, active, badge, onClick, style }) {
  return React.createElement('div', { onClick, style: { display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)', background: active ? 'var(--grad-accent)' : 'transparent', boxShadow: active ? 'var(--shadow-glow-accent)' : 'none', font: 'var(--text-body)', fontWeight: 'var(--weight-medium)', position: 'relative', transition: 'all var(--dur-fast) var(--ease-standard)', ...style } },
    React.createElement('span', { style: { fontSize: 17, width: 20, display: 'inline-flex', justifyContent: 'center' } }, icon),
    label && React.createElement('span', { style: { flex: 1 } }, label),
    badge && React.createElement('span', { style: { position: 'absolute', top: 6, right: label ? 14 : 6, width: 8, height: 8, borderRadius: 'var(--radius-circle)', background: 'var(--danger)' } }));
}
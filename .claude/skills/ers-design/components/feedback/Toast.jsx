import React from 'react';
export function Toast({ variant = 'info', title, description, onClose, style }) {
  const colors = { success: 'var(--success)', danger: 'var(--danger)', warning: 'var(--warning)', info: 'var(--accent)' };
  return React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderLeft: `3px solid ${colors[variant]}`, borderRadius: 'var(--radius-md)', padding: '14px 16px', boxShadow: 'var(--shadow-pop)', minWidth: 280, ...style } },
    React.createElement('div', { style: { flex: 1 } },
      React.createElement('div', { style: { font: 'var(--text-body)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' } }, title),
      description && React.createElement('div', { style: { font: 'var(--text-body-sm)', color: 'var(--text-secondary)', marginTop: 2 } }, description)),
    onClose && React.createElement('span', { onClick: onClose, style: { cursor: 'pointer', color: 'var(--text-tertiary)' } }, '✕'));
}
import React from 'react';
export function Dialog({ open, title, children, onClose, style }) {
  if (!open) return null;
  return React.createElement('div', { style: { position: 'fixed', inset: 0, background: 'rgba(5,5,10,.6)', backdropFilter: 'var(--blur-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }, onClick: onClose },
    React.createElement('div', { onClick: e => e.stopPropagation(), style: { background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 24, width: 420, boxShadow: 'var(--shadow-pop)', ...style } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
        React.createElement('span', { style: { font: 'var(--text-h2)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)' } }, title),
        React.createElement('span', { onClick: onClose, style: { cursor: 'pointer', color: 'var(--text-tertiary)' } }, '✕')),
      children));
}
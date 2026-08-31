import React from 'react';
export function Tag({ children, onRemove, style }) {
  return React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 8px 5px 12px', borderRadius: 'var(--radius-pill)', background: 'var(--bg-surface-2)', border: '1px solid var(--border-subtle)', font: 'var(--text-body-sm)', color: 'var(--text-primary)', ...style } },
    children, onRemove && React.createElement('span', { onClick: onRemove, style: { cursor: 'pointer', color: 'var(--text-tertiary)', fontSize: 11, padding: '0 2px' } }, '✕'));
}
import React from 'react';
export function Card({ padding = 20, highlight = false, style, children }) {
  return React.createElement('div', {
    style: {
      background: highlight ? 'var(--grad-accent)' : 'var(--bg-surface)',
      border: highlight ? 'none' : '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)', padding, boxShadow: 'var(--shadow-card)',
      color: highlight ? '#fff' : 'var(--text-primary)', ...style,
    },
  }, children);
}

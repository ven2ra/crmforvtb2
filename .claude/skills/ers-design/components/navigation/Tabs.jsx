import React from 'react';
export function Tabs({ items = [], active, onChange, style }) {
  return React.createElement('div', { style: { display: 'inline-flex', gap: 4, background: 'var(--bg-surface-2)', padding: 4, borderRadius: 'var(--radius-pill)', ...style } },
    items.map((it, i) => React.createElement('span', {
      key: i, onClick: () => onChange?.(it),
      style: { padding: '7px 16px', borderRadius: 'var(--radius-pill)', font: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', cursor: 'pointer', color: active === it ? 'var(--text-on-accent)' : 'var(--text-secondary)', background: active === it ? 'var(--accent)' : 'transparent', transition: 'all var(--dur-fast) var(--ease-standard)' },
    }, it)));
}
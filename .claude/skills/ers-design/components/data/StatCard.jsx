import React from 'react';
export function StatCard({ label, value, delta, deltaDirection = 'up', accent, trend, style }) {
  return React.createElement('div', { style: { position: 'relative', overflow: 'hidden', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 20, boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 170, ...style } },
    React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(120% 100% at 100% 0%, rgba(139,92,246,.10), transparent 55%)', pointerEvents: 'none' } }),
    React.createElement('span', { style: { font: 'var(--text-body-sm)', color: 'var(--text-secondary)', fontWeight: 'var(--weight-medium)' } }, label),
    React.createElement('span', { style: { font: 'var(--text-display)', fontWeight: 'var(--weight-extrabold)', color: accent || 'var(--text-primary)', letterSpacing: '-.02em' } }, value),
    delta && React.createElement('span', { style: { font: 'var(--text-caption)', color: deltaDirection === 'up' ? 'var(--success)' : 'var(--danger)', fontWeight: 'var(--weight-semibold)' } }, (deltaDirection === 'up' ? '↑ ' : '↓ ') + delta),
    trend && React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 3, height: 24, marginTop: 4 } },
      trend.map((v, i) => React.createElement('span', { key: i, style: { flex: 1, height: (v / Math.max(...trend)) * 100 + '%', minHeight: 2, borderRadius: 2, background: i === trend.length - 1 ? (accent || 'var(--accent)') : 'var(--bg-surface-3)' } }))));
}
import React from 'react';
const TONES = {
  neutral: { bg: 'var(--bg-surface-3)', fg: 'var(--text-secondary)' },
  success: { bg: 'var(--success-soft)', fg: 'var(--success)' },
  warning: { bg: 'var(--warning-soft)', fg: 'var(--warning)' },
  danger: { bg: 'var(--danger-soft)', fg: 'var(--danger)' },
  accent: { bg: 'var(--accent-soft)', fg: 'var(--accent-hover)' },
};
export function Badge({ tone = 'neutral', dot = false, children }) {
  const t = TONES[tone] || TONES.neutral;
  return React.createElement('span', {
    style: {
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
      borderRadius: 'var(--radius-pill)', font: 'var(--text-caption)', fontWeight: 600,
      background: t.bg, color: t.fg, whiteSpace: 'nowrap',
    },
  }, dot && React.createElement('span', { style: { width: 6, height: 6, borderRadius: '50%', background: t.fg, flexShrink: 0 } }), children);
}

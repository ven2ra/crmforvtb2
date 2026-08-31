import React from 'react';
const VARIANTS = {
  primary: { background: 'var(--accent)', color: '#fff', border: '1px solid transparent' },
  secondary: { background: 'var(--bg-surface-3)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' },
  ghost: { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid transparent' },
  danger: { background: 'var(--danger-soft)', color: 'var(--danger)', border: '1px solid transparent' },
};
const SIZES = {
  sm: { padding: '6px 12px', font: 'var(--text-body-sm)', gap: 6 },
  md: { padding: '9px 16px', font: 'var(--text-body)', gap: 8 },
  lg: { padding: '12px 20px', font: 'var(--text-h3)', gap: 8 },
};
export function Button({ variant = 'primary', size = 'md', icon, disabled, children, style, ...rest }) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  return React.createElement('button', {
    disabled, ...rest,
    style: {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: s.gap, padding: s.padding,
      font: s.font, fontWeight: 600, borderRadius: 'var(--radius-pill)', cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1, transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast)',
      ...v, ...style,
    },
    onMouseDown: e => { if (!disabled) e.currentTarget.style.transform = 'scale(.97)'; },
    onMouseUp: e => { e.currentTarget.style.transform = 'scale(1)'; },
  }, icon, children);
}
import React from 'react';
export function Radio({ label, checked, onChange, style }) {
  return React.createElement('label', { style: { display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', ...style } },
    React.createElement('span', { onClick: () => onChange?.(), style: { width: 18, height: 18, borderRadius: 'var(--radius-circle)', border: `2px solid ${checked ? 'var(--accent)' : 'var(--border-strong)'}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } },
      checked && React.createElement('span', { style: { width: 8, height: 8, borderRadius: 'var(--radius-circle)', background: 'var(--accent)' } })),
    label && React.createElement('span', { style: { font: 'var(--text-body)', color: 'var(--text-primary)' } }, label));
}
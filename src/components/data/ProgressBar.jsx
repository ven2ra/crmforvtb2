import React from 'react';
export function ProgressBar({ value = 0, max = 100, color = 'var(--accent)', style }) {
  const pct = Math.min(100, (value / max) * 100);
  return React.createElement('div', { style: { width: '100%', height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--bg-surface-3)', overflow: 'hidden', ...style } },
    React.createElement('div', { style: { width: pct + '%', height: '100%', background: color, borderRadius: 'var(--radius-pill)', transition: 'width var(--dur-slow) var(--ease-out)' } }));
}
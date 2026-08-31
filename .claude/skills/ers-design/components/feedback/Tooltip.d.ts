import { ReactNode } from 'react';
export interface TooltipProps { label: string; children?: ReactNode; }
export function Tooltip(props: TooltipProps): JSX.Element;
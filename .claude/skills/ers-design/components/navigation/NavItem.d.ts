import { ReactNode, CSSProperties } from 'react';
/** @startingPoint section="Navigation" subtitle="Sidebar icon/label row with active + notification-dot states" viewport="320x70" */
export interface NavItemProps { icon: ReactNode; label?: string; active?: boolean; badge?: boolean; onClick?: () => void; style?: CSSProperties; }
export function NavItem(props: NavItemProps): JSX.Element;
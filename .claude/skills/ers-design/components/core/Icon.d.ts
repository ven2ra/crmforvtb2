export interface IconProps {
  /** Icon name from the built-in set (substitute for a Lucide-style stroke icon set; codebase icons unavailable) */
  name?: 'phone'|'message'|'inbox'|'users'|'clock'|'search'|'bell'|'settings'|'chevronDown'|'check'|'x'|'plus'|'more'|'arrowUpRight'|'calendar'|'filter'|'video'|'mail'|'star'|'home';
  size?: number;
  color?: string;
  strokeWidth?: number;
}
export function Icon(props: IconProps): JSX.Element;

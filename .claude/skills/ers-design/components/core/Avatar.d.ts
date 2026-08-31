/**
 * @startingPoint section="Core" subtitle="Initials/photo avatar + stacked group" viewport="700x160"
 */
export interface AvatarProps { name?: string; src?: string; size?: number; status?: 'online'|'busy'|'away'; ring?: boolean; }
export interface AvatarStackProps { names?: string[]; max?: number; size?: number; }
export function Avatar(props: AvatarProps): JSX.Element;
export function AvatarStack(props: AvatarStackProps): JSX.Element;

import { ReactNode, CSSProperties } from 'react';
export interface IconButtonProps { icon: ReactNode; active?: boolean; size?: number; disabled?: boolean; onClick?: () => void; style?: CSSProperties; }
export function IconButton(props: IconButtonProps): JSX.Element;
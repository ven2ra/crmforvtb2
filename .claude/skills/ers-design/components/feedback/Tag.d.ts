import { ReactNode, CSSProperties } from 'react';
export interface TagProps { children?: ReactNode; onRemove?: () => void; style?: CSSProperties; }
export function Tag(props: TagProps): JSX.Element;
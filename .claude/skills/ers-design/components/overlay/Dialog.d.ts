import { ReactNode, CSSProperties } from 'react';
export interface DialogProps { open: boolean; title?: string; children?: ReactNode; onClose?: () => void; style?: CSSProperties; }
export function Dialog(props: DialogProps): JSX.Element;
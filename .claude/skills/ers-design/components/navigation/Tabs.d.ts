export interface TabsProps { items?: string[]; active?: string; onChange?: (v: string) => void; style?: React.CSSProperties; }
export function Tabs(props: TabsProps): JSX.Element;
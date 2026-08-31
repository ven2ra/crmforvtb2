/**
 * @startingPoint section="Core" subtitle="Surface container, plain or gradient-highlight" viewport="700x200"
 */
export interface CardProps { padding?: number; highlight?: boolean; style?: React.CSSProperties; children?: React.ReactNode; }
export function Card(props: CardProps): JSX.Element;

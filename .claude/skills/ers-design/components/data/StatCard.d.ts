/** @startingPoint section="Data" subtitle="Metric tile — label, big number, trend delta" viewport="500x180" */
export interface StatCardProps { label: string; value: string; delta?: string; deltaDirection?: 'up' | 'down'; accent?: string; style?: React.CSSProperties; }
export function StatCard(props: StatCardProps): JSX.Element;
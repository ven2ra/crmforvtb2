/**
 * @startingPoint section="Forms" subtitle="Dropdown select, pill trigger" viewport="700x140"
 */
export interface SelectOption { value: string; label: string; }
export interface SelectProps { options: SelectOption[]; value?: string; onChange?: (v: string) => void; style?: React.CSSProperties; }
export function Select(props: SelectProps): JSX.Element;

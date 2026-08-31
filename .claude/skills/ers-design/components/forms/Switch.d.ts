/**
 * @startingPoint section="Forms" subtitle="Toggle switch, on/off/disabled" viewport="700x120"
 */
export interface SwitchProps { checked?: boolean; onChange?: (v: boolean) => void; disabled?: boolean; }
export function Switch(props: SwitchProps): JSX.Element;

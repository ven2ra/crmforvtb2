/**
 * @startingPoint section="Core" subtitle="Status pill with 5 tones" viewport="700x160"
 */
export interface BadgeProps {
  tone?: 'neutral'|'success'|'warning'|'danger'|'accent';
  dot?: boolean;
  children?: React.ReactNode;
}
export function Badge(props: BadgeProps): JSX.Element;

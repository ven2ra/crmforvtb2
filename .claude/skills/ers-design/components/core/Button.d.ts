import { ReactNode, CSSProperties } from 'react';
/** @startingPoint section="Core" subtitle="Primary action button — pill shape, 4 variants" viewport="700x200" */
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
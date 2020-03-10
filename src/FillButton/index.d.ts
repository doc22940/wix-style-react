import * as React from 'react';
import { PopoverCommonProps } from '../common';

export interface FillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  iconSize?: FillButtonIconSize;
  disabled?: boolean;
  fill?: string;
  tooltipProps?: PopoverCommonProps;
  dataHook?: string;
}

export default class FillButton extends React.PureComponent<FillButtonProps> {}
export type FillButtonIconSize = 'small' | 'medium';

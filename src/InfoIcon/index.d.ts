import * as React from 'react';
import { PopoverCommonProps } from '../common';

export type InfoIconSize = 'small' | 'medium';

export interface InfoIconProps {
  content: React.ReactNode;
  size?: InfoIconSize;
  dataHook?: string;
  tooltipProps?: PopoverCommonProps;
}

declare const InfoIcon: React.FC<InfoIconProps>;

export default InfoIcon;

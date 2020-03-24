import * as React from 'react';

export interface BarChartItem {
  value: number;
  label?: React.ReactNode;
  labelShort?: React.ReactNode;
  description?: React.ReactNode;
  descriptionInfo?: React.ReactNode;
  onDescriptionInfoShown?: () => void;
}

export interface BarChartProps {
  items: BarChartItem[];
  total?: number;
  dataHook?: string;
  onDescriptionInfoShown?: () => void;
}

export interface BarChartState {
  width: number;
}

export default class BarChart extends React.Component<BarChartProps, BarChartState>  {}

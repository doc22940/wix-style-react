import * as React from 'react';
import { InputProps } from '../Input';

export interface InputWithLabelProps {
  dataHook?: string;
  suffix?: React.ReactNode[];
  label?: string;
  value?: string | number;
  status?: InputProps['status'];
  statusMessage?: InputProps['statusMessage'];
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  type?: string;
  ariaLabel?: string;
  autoFocus?: boolean;
  autocomplete?: string;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  placeholder?: string;
  customInput?: React.ReactNode | Function;
}

export default class InputWithLabel extends React.Component<
  InputWithLabelProps
> {}

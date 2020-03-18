import { BaseDriver } from 'wix-ui-test-utils/driver-factory';

export interface RadioButtonDriver extends BaseDriver {
  check: () => void;
  isChecked: () => boolean;
  isDisabled: () => boolean;
  getLabel: () => string;
  getLabelElement: () => Element;
  getValue: () => string;
  getTabIndex: () => string | null;
  getContent: () => HTMLElement;
}

import { BaseDriver } from 'wix-ui-test-utils/driver-factory';

// For internal use only!
export interface buttonDriverFactory extends BaseDriver {
  click: () => void;
  focus: () => void;
  blur: () => void;
  mouseEnter: () => void;
  mouseLeave: () => void;
  getButtonTextContent: () => string;
  isButtonDisabled: () => boolean;
  isPrefixIconExists: () => boolean;
  isSuffixIconExists: () => boolean;
}

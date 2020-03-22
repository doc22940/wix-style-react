import { BaseUniDriver } from 'wix-ui-test-utils/base-driver';
import { ButtonNextDriver } from 'wix-ui-core/drivers/unidriver';

export interface ToggleButtonUniDriver extends BaseUniDriver {
  isButtonDisabled: ButtonNextDriver['isButtonDisabled'];
  getSkin: () => Promise<string | null>;
  isButtonSelected: () => Promise<boolean>;
  getLabelPlacement: () => Promise<string>;
  getLabelValue: () => Promise<string>;
}

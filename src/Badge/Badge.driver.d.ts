import { BaseDriver } from 'wix-ui-test-utils/driver-factory';

export type Skin =
  | 'general'
  | 'standard'
  | 'danger'
  | 'success'
  | 'neutral'
  | 'warning'
  | 'urgent'
  | 'neutralStandard'
  | 'neutralSuccess'
  | 'nutralDanger'
  | 'premium';
export type Type = 'solid' | 'outlined' | 'transparent';
export type Size = 'medium' | 'small';

export interface BadgeDriver extends BaseDriver {
  exists(): boolean;
  getContent(): string;
  text(): string;
  getType(): Type;
  getSkin(): Skin;
  getSize(): Size;
  isUppercase(): boolean;
  hasClickCursor(): boolean;
  click(): void;
}

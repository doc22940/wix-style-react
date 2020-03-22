import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const badgeUniDriverFactory = base => ({
  ...baseUniDriverFactory(base),
  /** returns elements innerHTML*/
  getContent: () => base._prop('innerHTML'),
  /** returns elements text */
  text: () => base.text(),
  getType: () => base.attr('data-type'),
  getSkin: () => base.attr('data-skin'),
  getSize: () => base.attr('data-size'),
  isUppercase: async () => (await base.attr('data-uppercase')) === 'true',
  hasClickCursor: async () => (await base.attr('data-clickable')) === 'true',
});

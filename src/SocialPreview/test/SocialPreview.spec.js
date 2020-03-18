import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import SocialPreview from '../SocialPreview';
import { socialPreviewPrivateDriverFactory } from './SocialPreview.private.uni.driver';

describe('SocialPreview', () => {
  const createDriver = createUniDriverFactory(
    socialPreviewPrivateDriverFactory,
  );

  it('should override with default values', async () => {
    const props = {
      title: 'social-preview',
      previewUrl: 'SOCIAL-PREVIEW.COM',
      description: 'a social preview test',
    };
    const driver = createDriver(<SocialPreview {...props} />);

    expect(await driver.exists()).toBe(true);
    expect(await driver.getTitle()).toEqual('social-preview');
    expect(await driver.getPreviewUrl()).toEqual('SOCIAL-PREVIEW.COM');
    expect(await driver.getDescription()).toEqual('a social preview test');
  });
});

import { socialPreviewDriverFactory as publicDriverFactory } from '../SocialPreview.uni.driver';

export const socialPreviewPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};

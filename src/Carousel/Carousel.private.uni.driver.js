import { ReactBase } from '../../test/utils/unidriver';
import { carouselUniDriverFactory } from './Carousel.uni.driver';
import ReactTestUtils from 'react-dom/test-utils';
import { iconButtonTestkitFactory } from 'wix-style-react/dist/testkit';

export const carouselPrivateUniDriverFactory = base => {
  const getCurrentSlide = () => base.$('.slick-current');

  const arrowButtonDriver = direction =>
    iconButtonTestkitFactory(`[data-hook="${base.$(`${direction}-button`)}"]`);

  return {
    ...carouselUniDriverFactory(base),
    getCurrentImageIndex: async () =>
      Number(await getCurrentSlide().attr('data-index')),
    isPrevButtonDisabled: () => arrowButtonDriver('prev').isButtonDisabled(),
    isNextButtonDisabled: () => arrowButtonDriver('next').isButtonDisabled(),
    loadImages: () => {
      base
        .$$('[data-hook="carousel-img"]')
        .map(async img => ReactTestUtils.Simulate.load(await img.getNative()));
    },
    clickPrevious: () => base.$('[data-hook="prev-button"]').click(),
    clickNext: () => base.$('[data-hook="next-button"]').click(),
    mouseOver: () => ReactBase(getCurrentSlide()).mouseOver(),
    mouseOut: () => ReactBase(getCurrentSlide()).mouseOut(),
    clickPageNavigationDot: index => {
      const pageNavigator = base.$(`[data-hook="page-navigation-${index}"]`);
      pageNavigator.click();
    },
    getChildText: child => child.text(),
  };
};

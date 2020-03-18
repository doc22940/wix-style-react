import React from 'react';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/react';

import sectionHelperDriverFactory from '../SectionHelper.driver';
import { sectionHelperUniDriverFactory } from '../SectionHelper.uni.driver';
import { Appearance } from '../constants';
import SectionHelper from '../index';

const createSectionHelper = (props = {}) => {
  const dataHook = 'section-helper';
  return <SectionHelper {...props} dataHook={dataHook} />;
};

describe('SectionHelper', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(sectionHelperDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(sectionHelperUniDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());

    it('should render', async () => {
      const { driver } = render(createSectionHelper());
      expect(await driver.exists()).toBe(true);
    });

    it('should render children', async () => {
      const { driver } = render(
        createSectionHelper({ children: 'Muffins are the best!' }),
      );
      expect(await driver.textContent()).toEqual('Muffins are the best!');
    });

    it('should render title', async () => {
      const { driver } = render(
        createSectionHelper({ title: 'Muffins are the best!' }),
      );
      expect(await driver.titleText()).toEqual('Muffins are the best!');
    });

    describe('given `actionText` & `onAction` props', () => {
      it('should render button', async () => {
        const { driver } = render(
          createSectionHelper({
            actionText: 'Muffins are the best!',
            onAction: () => null,
          }),
        );

        expect(await driver.actionText()).toEqual('Muffins are the best!');
      });

      it('should call `onAction` when clicked', async () => {
        const onAction = jest.fn();
        const { driver } = render(
          createSectionHelper({ onAction, actionText: 'hello' }),
        );
        await driver.clickAction();
        expect(onAction).toBeCalled();
      });
    });

    describe('close button', () => {
      it('should call `onClose` when close btn clicked', async () => {
        const onClose = jest.fn();
        const { driver } = render(createSectionHelper({ onClose }));
        await driver.clickClose();
        expect(await driver.isCloseButtonDisplayed()).toBe(true);
        expect(onClose).toBeCalled();
      });

      it('should not display the close button on demand', async () => {
        const { driver } = render(
          createSectionHelper({ showCloseButton: false }),
        );
        expect(await driver.isCloseButtonDisplayed()).toBe(false);
      });
    });

    describe('Appearance', () => {
      it('should render `standard` by default', async () => {
        const { driver } = render(createSectionHelper());
        expect(await driver.isWarning()).toBe(true);
      });

      Object.values(Appearance).map(appearance =>
        it(`should support ${appearance} appearance`, async () => {
          const { driver } = render(createSectionHelper({ appearance }));
          expect(
            await driver[
              `is${appearance[0].toUpperCase()}${appearance.slice(1)}`
            ](),
          ).toBe(true);
        }),
      );
    });
  }
});

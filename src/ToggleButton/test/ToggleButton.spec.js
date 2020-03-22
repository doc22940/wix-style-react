import React from 'react';
import CropRotate from 'wix-ui-icons-common/CropRotate';

import {
  cleanup,
  createRendererWithUniDriver,
} from '../../../test/utils/react/index';
import { toggleButtonPrivateDriverFactory } from '../ToggleButton.private.uni.driver';
import ToggleButton from '../index';
import { dataHooks } from './storySettings';

describe('ToggleButton', () => {
  afterEach(() => cleanup());

  const render = createRendererWithUniDriver(toggleButtonPrivateDriverFactory);

  describe('`skin` prop', () => {
    it.each(['standard', 'dark'])('should apply %s skin', async skin => {
      const props = {
        skin,
        labelValue: 'crop&rotate',
        children: <CropRotate />,
      };
      const { driver } = render(<ToggleButton {...props} />);

      expect(await driver.getSkin()).toEqual(skin);
    });
  });

  describe('Icon size ', () => {
    const dataHook = dataHooks.iconOfToggleButton;

    it.each([
      ['18px', 'tiny'],
      ['18px', 'small'],
      ['24px', 'medium'],
      ['24px', 'large'],
    ])('should be %s when given size - %s', async (expected, size) => {
      const props = {
        size,
        labelValue: 'crop&rotate',
        children: <CropRotate data-hook={dataHook} />,
      };
      const { driver } = render(<ToggleButton {...props} />);

      expect(await driver.getIconSize()).toEqual(expected);
    });
  });

  describe(`'selected' prop`, () => {
    it('should apply className when selected', async () => {
      const props = {
        selected: true,
        labelValue: 'crop&rotate',
        children: <CropRotate />,
      };
      const { driver } = render(<ToggleButton {...props} />);

      expect(await driver.isButtonSelected()).toEqual(true);
    });
  });

  describe('Label placement ', () => {
    const dataHook = dataHooks.iconOfToggleButton;

    it.each(['tooltip', 'end', 'bottom'])(
      'should be %s',
      async labelPlacement => {
        const props = {
          labelPlacement,
          labelValue: 'crop&rotate',
          children: <CropRotate data-hook={dataHook} />,
        };
        const { driver } = render(<ToggleButton {...props} />);

        expect(await driver.getLabelPlacement()).toEqual(labelPlacement);
      },
    );
  });

  describe('Label value ', () => {
    const dataHook = dataHooks.iconOfToggleButton;

    it.each([
      ['Tooltip label', 'tooltip'],
      ['End label', 'end'],
      ['Bottom label', 'bottom'],
    ])(
      'should be "%s" when placement is "%s"',
      async (labelValue, labelPlacement) => {
        const props = {
          labelPlacement,
          labelValue,
          children: <CropRotate data-hook={dataHook} />,
        };
        const { driver } = render(<ToggleButton {...props} />);

        expect(await driver.getLabelValue()).toEqual(labelValue);
      },
    );
  });
});

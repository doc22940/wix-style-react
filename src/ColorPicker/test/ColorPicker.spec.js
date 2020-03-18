import React from 'react';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/react';
import color from 'color';
import colorPickerDriverFactory from '../ColorPicker.private.driver';
import { colorPickerUniDriverFactory } from '../ColorPicker.private.uni.driver';

import ColorPicker from '../ColorPicker';

describe('ColorPicker', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(colorPickerDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(colorPickerUniDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());

    it('should successfully render a component', async () => {
      const onChange = jest.fn();
      const onCancel = jest.fn();
      const onConfirm = jest.fn();
      const { driver } = render(
        <ColorPicker
          {...{ value: '#000000', onChange, onCancel, onConfirm }}
        />,
      );
      expect(await driver.exists()).toBe(true);
      expect(await driver.historyPanelExists()).toBe(false);
    });

    describe('History', () => {
      it('should show history panel with current color selected as previous', async () => {
        const onChange = jest.fn();
        const onCancel = jest.fn();
        const onConfirm = jest.fn();
        const value = '#000000';
        const { driver } = render(
          <ColorPicker
            {...{
              value,
              onChange,
              onCancel,
              onConfirm,
              showHistory: true,
            }}
          />,
        );
        expect(await driver.historyPanelExists()).toBe(true);
        expect(color(await driver.historyCurrentColor()).hex()).toBe(value);
        expect(color(await driver.historyPreviousColor()).hex()).toBe(value);
      });

      it('should not update previous color after current color change but not confirm', async () => {
        const onChange = jest.fn();
        const onCancel = jest.fn();
        const onConfirm = jest.fn();
        const value = '#00FF00';
        const { driver } = render(
          <ColorPicker
            {...{
              value,
              onChange,
              onCancel,
              onConfirm,
              showHistory: true,
            }}
          />,
        );
        await driver.selectBlackColor();
        expect(color(await driver.historyCurrentColor()).hex()).toBe('#000000');
        expect(color(await driver.historyPreviousColor()).hex()).toBe(value);
      });

      it('should set previous color to be active color', async () => {
        const onChange = jest.fn();
        const onCancel = jest.fn();
        const onConfirm = jest.fn();
        const value = '#00FF00';
        const { driver } = render(
          <ColorPicker
            {...{
              value,
              onChange,
              onCancel,
              onConfirm,
              showHistory: true,
            }}
          />,
        );
        await driver.selectBlackColor();
        expect(color(await driver.historyCurrentColor()).hex()).toBe('#000000');
        expect(color(await driver.historyPreviousColor()).hex()).toBe(value);
        await driver.clickOnPreviousColor();
        expect(color(await driver.historyCurrentColor()).hex()).toBe(value);
      });

      it('should update previous color after confirm click', async () => {
        const onChange = jest.fn();
        const onCancel = jest.fn();
        const onConfirm = jest.fn();
        const value = '#00FF00';
        const { driver } = render(
          <ColorPicker
            {...{
              value,
              onChange,
              onCancel,
              onConfirm,
              showHistory: true,
            }}
          />,
        );
        await driver.selectBlackColor();
        expect(color(await driver.historyCurrentColor()).hex()).toBe('#000000');
        expect(color(await driver.historyPreviousColor()).hex()).toBe(value);
        await driver.confirm();
        expect(color(await driver.historyCurrentColor()).hex()).toBe('#000000');
        expect(color(await driver.historyPreviousColor()).hex()).toBe(
          '#000000',
        );
      });

      it('`onCancel` should be called when cancel icon is clicked', async () => {
        const onChange = jest.fn();
        const onCancel = jest.fn();
        const onConfirm = jest.fn();
        const value = '#00FF00';
        const { driver } = render(
          <ColorPicker
            {...{
              value,
              onChange,
              onCancel,
              onConfirm,
              showHistory: true,
            }}
          />,
        );
        await driver.selectBlackColor();
        expect(color(await driver.historyCurrentColor()).hex()).toBe('#000000');
        expect(color(await driver.historyPreviousColor()).hex()).toBe(value);
        await driver.cancel();
        expect(onChange).toHaveBeenCalledTimes(1);
      });
    });
  }

  describe('onAdd prop', () => {
    const render = createRendererWithUniDriver(colorPickerUniDriverFactory);
    it('should call callback with current color', async () => {
      const onChange = jest.fn();
      const onCancel = jest.fn();
      const onConfirm = jest.fn();
      const onAdd = jest.fn();
      const value = '#00FF00';
      const { driver } = render(
        <ColorPicker
          {...{
            value,
            onChange,
            onCancel,
            onConfirm,
            onAdd,
            showHistory: true,
          }}
        />,
      );
      await driver.clickAddColor();

      expect(onAdd).toHaveBeenCalledTimes(1);
      expect(onAdd).toHaveBeenCalledWith(value);
    });
  });

  describe('allowEmpty prop', () => {
    const render = createRendererWithUniDriver(colorPickerUniDriverFactory);
    it('should return color with alpha=0 if no color selected', async () => {
      const onChange = jest.fn();
      const onCancel = jest.fn();
      const onConfirm = jest.fn();
      const value = '';
      const { driver } = render(
        <ColorPicker
          {...{
            value,
            onChange,
            onCancel,
            onConfirm,
            allowEmpty: true,
          }}
        />,
      );
      await driver.confirm();

      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(onConfirm).toHaveBeenCalledWith(
        expect.objectContaining({ valpha: 0 }),
      );
    });
  });

  describe('children prop', () => {
    const render = createRendererWithUniDriver(colorPickerUniDriverFactory);
    it('should render if node given', async () => {
      const onChange = jest.fn();
      const onCancel = jest.fn();
      const onConfirm = jest.fn();
      const value = '#000';
      const children = 'text children';
      const { driver } = render(
        <ColorPicker
          {...{
            value,
            onChange,
            onCancel,
            onConfirm,
            children,
          }}
        />,
      );

      expect(await (await driver.getChildren()).text()).toBe(children);
    });
    it('should call given function if passed and inject changeColor', () => {
      const onChange = jest.fn();
      const onCancel = jest.fn();
      const onConfirm = jest.fn();
      const value = '#000';
      const childrenFunction = jest.fn();
      const children = changeColor => childrenFunction(changeColor);
      const { driver } = render(
        <ColorPicker
          {...{
            value,
            onChange,
            onCancel,
            onConfirm,
            children,
          }}
        />,
      );
      expect(childrenFunction).toHaveBeenCalledTimes(1);
      expect(childrenFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          changeColor: expect.anything(),
        }),
      );
    });
  });

  // private driver test only
  it('should update the color after clicking Enter', async () => {
    const render = createRendererWithDriver(colorPickerDriverFactory);
    const onChange = jest.fn();
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const sampleColor = '#000000';
    const expectedColor = { color: [0, 0, 0], model: 'rgb', valpha: 1 };
    const { driver } = render(
      <ColorPicker
        {...{
          value: '',
          onChange,
          onCancel,
          onConfirm,
        }}
      />,
    );
    await driver.typeValueOnHexInput(sampleColor);
    await driver.keyDownOnHexInput('Enter');

    expect(onConfirm).toHaveBeenCalledWith(expectedColor);
  });
});

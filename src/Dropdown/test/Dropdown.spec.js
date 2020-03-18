import React from 'react';
import PropTypes from 'prop-types';
import dropdownDriverFactory from '../Dropdown.driver';
import Dropdown from '../Dropdown';
import { sleep } from 'wix-ui-test-utils/react-helpers';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/unit';
import { dropdownUniDriverFactory } from '../Dropdown.uni.driver';

describe('Dropdown', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(dropdownDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(dropdownUniDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());

    const createDriver = jsx => render(jsx).driver;

    const getOptions = () => [
      { id: 0, value: 'Option 1' },
      { id: 1, value: 'Option 2' },
      { id: 2, value: 'Option 3', disabled: true },
      { id: 3, value: 'Option 4' },
      { id: 'divider1', value: '-' },
      {
        id: 'element1',
        value: <span style={{ color: 'brown' }}>Option 4</span>,
      },
    ];

    describe('Uncontrolled SelectedId', () => {
      it('should select item with selectedId on init state', async () => {
        const { inputDriver, dropdownLayoutDriver } = createDriver(
          <Dropdown options={getOptions()} initialSelectedId={0} />,
        );

        expect(await dropdownLayoutDriver.isOptionSelected(0)).toBe(true);
        expect(await inputDriver.getValue()).toBe('Option 1');
      });

      it('should select an item when clicked', async () => {
        const { driver, dropdownLayoutDriver } = createDriver(
          <Dropdown options={getOptions()} />,
        );
        await driver.focus();
        await dropdownLayoutDriver.clickAtOption(0);
        expect(await dropdownLayoutDriver.isOptionSelected(0)).toBe(true);
      });

      it('should enter the selected option text when selected', async () => {
        const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
          <Dropdown options={getOptions()} />,
        );
        await driver.focus();
        await dropdownLayoutDriver.clickAtOption(0);
        expect(await inputDriver.getValue()).toBe('Option 1');
      });

      it('should close when clicking on input (header)', async () => {
        const { dropdownLayoutDriver, inputDriver } = createDriver(
          <Dropdown options={getOptions()} />,
        );
        await inputDriver.click();
        expect(await dropdownLayoutDriver.isShown()).toBe(true);

        return sleep(200).then(async () => {
          await inputDriver.click();
          expect(await dropdownLayoutDriver.isShown()).toBe(false);
        });
      });

      it('should not be editable ', async () => {
        const { driver } = createDriver(<Dropdown options={getOptions()} />);
        expect(await driver.isEditable()).toBe(false);
      });

      it('should have no selection when initialSelectedId is null', async () => {
        const { driver: _driver } = render(
          <Dropdown
            options={[{ id: 0, value: 'Option 1' }]}
            initialSelectedId={null}
          />,
        );
        const { dropdownLayoutDriver, inputDriver } = _driver;

        expect(await dropdownLayoutDriver.isOptionSelected(0)).toBe(false);

        expect(await inputDriver.getValue()).toBe('');
      });

      describe('initiallySelected', () => {
        it('should keep selectedId and value when initialSelectedId changed', async () => {
          const { driver: _driver, rerender } = render(
            <Dropdown options={getOptions()} initialSelectedId={0} />,
          );
          const { dropdownLayoutDriver } = _driver;
          expect(await dropdownLayoutDriver.isOptionSelected(0)).toBe(true);
          rerender(<Dropdown options={getOptions()} initialSelectedId={1} />);
          expect(await dropdownLayoutDriver.isOptionSelected(0)).toBe(true);
        });
      });

      it(`should update selectedId when options change and id does not exist anymore`, async () => {
        const { driver: _driver, rerender } = render(
          <Dropdown
            options={[
              { id: 0, value: 'Option 1' },
              { id: 1, value: 'Option 2' },
            ]}
            initialSelectedId={0}
          />,
        );
        const { inputDriver, dropdownLayoutDriver } = _driver;

        const option = await dropdownLayoutDriver.optionById(0);
        expect(await option.isSelected()).toBe(true);
        expect(await inputDriver.getValue()).toBe('Option 1');
        rerender(<Dropdown options={[{ id: 1, value: 'Option 2' }]} />);

        const options = await dropdownLayoutDriver.options();
        const isAnyOptionSelected = (
          await Promise.all(options.map(option => option.isSelected()))
        ).some(val => val);

        expect(isAnyOptionSelected).toBe(false);
        expect(await inputDriver.getValue()).toBe('');
      });

      it('should select item with selectedId on async init', async () => {
        const { driver: _driver, rerender } = render(
          <Dropdown options={[]} selectedId={0} />,
        );
        const { inputDriver, dropdownLayoutDriver } = _driver;

        const options = await dropdownLayoutDriver.options();
        const isAnyOptionSelected = (
          await Promise.all(options.map(option => option.isSelected()))
        ).some(val => val);

        expect(isAnyOptionSelected).toBe(false);
        expect(await inputDriver.getValue()).toBe('');

        rerender(
          <Dropdown
            options={[
              { id: 0, value: 'Option 1' },
              { id: 1, value: 'Option 2' },
            ]}
            selectedId={0}
          />,
        );

        const option = await dropdownLayoutDriver.optionById(0);
        expect(await option.isSelected()).toBe(true);
        expect(await inputDriver.getValue()).toBe('Option 1');
      });

      describe('PropTypes Validation', () => {
        let consoleErrorSpy;

        beforeEach(() => {
          consoleErrorSpy = jest
            .spyOn(global.console, 'error')
            .mockImplementation(jest.fn());
        });
        afterEach(() => {
          consoleErrorSpy.mockRestore();
          PropTypes.checkPropTypes.resetWarningCache();
        });

        it('should log error when selectedId and initialSelectedId are used together', async () => {
          render(
            <Dropdown
              options={getOptions()}
              selectedId={0}
              initialSelectedId={0}
            />,
          );
          expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
          expect(consoleErrorSpy).toBeCalledWith(
            expect.stringContaining(
              `'selectedId' and 'initialSelectedId' cannot both be used at the same time.`,
            ),
          );
        });
      });
    });

    describe('Controlled SelectedId', () => {
      it('should keep current selection and value when option clicked', async () => {
        const { driver, dropdownLayoutDriver, inputDriver } = createDriver(
          <Dropdown options={getOptions()} selectedId={0} />,
        );

        await driver.focus();
        await dropdownLayoutDriver.clickAtOption(1);

        expect(await dropdownLayoutDriver.isOptionSelected(0)).toBe(true);

        expect(await inputDriver.getValue()).toBe('Option 1');
      });

      it('should have no selection if selectedId does not exist', async () => {
        const { dropdownLayoutDriver } = createDriver(
          <Dropdown options={[{ id: 0, value: 'Option 1' }]} selectedId={99} />,
        );
        const option = await dropdownLayoutDriver.optionById(0);
        expect(await option.isSelected()).toBe(false);
      });

      it('should update selection and value when selectedId changes', async () => {
        const { driver: _driver, rerender } = render(
          <Dropdown options={getOptions()} selectedId={0} />,
        );
        const { dropdownLayoutDriver, inputDriver } = _driver;

        expect(await dropdownLayoutDriver.isOptionSelected(0)).toBe(true);
        expect(await inputDriver.getValue()).toBe('Option 1');

        rerender(<Dropdown options={getOptions()} selectedId={1} />);
        expect(await dropdownLayoutDriver.isOptionSelected(1)).toBe(true);

        expect(await inputDriver.getValue()).toBe('Option 2');
      });

      it('should have no selection when selectedId is null', async () => {
        const { driver: _driver } = render(
          <Dropdown
            options={[{ id: 0, value: 'Option 1' }]}
            selectedId={null}
          />,
        );
        const { dropdownLayoutDriver, inputDriver } = _driver;

        expect(await dropdownLayoutDriver.isOptionSelected(0)).toBe(false);

        expect(await inputDriver.getValue()).toBe('');
      });
    });

    describe('Rerender', () => {
      it('should keep value when unrelated prop updates', async () => {
        const { driver: _driver, rerender } = render(
          <Dropdown options={getOptions()} />,
        );
        const { inputDriver } = _driver;

        await inputDriver.enterText('foo');
        expect(await inputDriver.getValue()).toBe('foo');
        rerender(<Dropdown options={getOptions()} status="error" />);

        expect(await inputDriver.getValue()).toBe('foo');
      });

      it('should clear selection when selectedId is updated to null', async () => {
        const { driver: _driver, rerender } = render(
          <Dropdown options={getOptions()} selectedId={0} />,
        );
        const { dropdownLayoutDriver, inputDriver } = _driver;

        expect(await dropdownLayoutDriver.isOptionSelected(0)).toBe(true);
        expect(await inputDriver.getValue()).toBe('Option 1');

        rerender(<Dropdown options={getOptions()} selectedId={null} />);
        expect(await dropdownLayoutDriver.isOptionSelected(0)).toBe(false);

        expect(await inputDriver.getValue()).toBe('');
      });
    });
  }
});

import React from 'react';
import autoCompleteDriverFactory from '../AutoComplete.driver';
import { autoCompleteUniDriverFactory } from '../AutoComplete.uni.driver';
import AutoComplete from '../AutoComplete';
import {
  cleanup,
  createRendererWithDriver,
  createRendererWithUniDriver,
} from '../../../test/utils/unit';

const asciiA = '97';

describe('Autocomplete', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(autoCompleteDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(autoCompleteUniDriverFactory));
  });

  function runTests(render) {
    const createDriver = jsx => render(jsx).driver;
    afterEach(() => cleanup());
    const options = [
      { id: 0, value: 'aaa' },
      { id: 1, value: 'abb' },
      { id: 2, value: 'bbb', disabled: true },
      { id: 3, value: 'bcc' },
      { id: 'divider1', value: '-' },
      { id: 'element1', value: <span style={{ color: 'brown' }}>ccc</span> },
    ];

    const predicate = option =>
      option.value
        .toString()
        .toLowerCase()
        .indexOf('a') !== -1;

    it('should not filter anything without predicate function', async () => {
      const { dropdownLayoutDriver } = createDriver(
        <AutoComplete options={options} />,
      );
      expect(await dropdownLayoutDriver.optionsLength()).toBe(options.length);
    });

    ['ArrowUp', 'ArrowDown'].forEach(key => {
      it(`should not filter items according to predicate function when pressing ${key}`, async () => {
        const { inputDriver, dropdownLayoutDriver } = createDriver(
          <AutoComplete options={options} predicate={predicate} />,
        );
        await inputDriver.trigger('keyDown', { key });
        expect(await dropdownLayoutDriver.optionsLength()).toBe(options.length);
      });
    });

    it('should filter items according to predicate function when typing characters', async () => {
      const { inputDriver, dropdownLayoutDriver } = createDriver(
        <AutoComplete options={options} predicate={predicate} />,
      );
      await inputDriver.click();
      await inputDriver.trigger('keyDown', { key: asciiA });
      expect(await dropdownLayoutDriver.optionsLength()).toBe(2);
    });

    it('should not display dropdown layout in case all options are filtered', async () => {
      const { inputDriver, dropdownLayoutDriver } = createDriver(
        <AutoComplete options={options} predicate={() => false} />,
      );
      await inputDriver.click();
      await inputDriver.trigger('keyDown', { key: asciiA });
      expect(await dropdownLayoutDriver.optionsLength()).toBe(0);
    });

    it('should display empty state message in case all options are filtered', async () => {
      const emptyStateMessage = 'Empty state';
      const { inputDriver, dropdownLayoutDriver } = createDriver(
        <AutoComplete
          options={options}
          predicate={() => false}
          emptyStateMessage={emptyStateMessage}
        />,
      );

      await inputDriver.click();
      await inputDriver.trigger('keyDown', { key: asciiA });

      expect(await dropdownLayoutDriver.isShown()).toBe(true);
      expect(await dropdownLayoutDriver.optionsLength()).toBe(1);
      const option = (await dropdownLayoutDriver.options())[0];
      expect(await option.content()).toBe(emptyStateMessage);
      expect(await option.isDisabled()).toBe(true);
    });

    it('should show all items when focusing even if some text exist', async () => {
      const { dropdownLayoutDriver, inputDriver } = createDriver(
        <AutoComplete options={options} predicate={predicate} />,
      );
      await inputDriver.enterText('aaa');
      await inputDriver.focus();
      expect(await dropdownLayoutDriver.optionsLength()).toBe(options.length);
    });
  }
});

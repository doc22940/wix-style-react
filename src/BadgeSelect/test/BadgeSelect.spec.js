import React from 'react';
import BadgeSelect from '../BadgeSelect';
import { SKIN, SIZE, TYPE } from '../../Badge/constants';
import {
  createRendererWithDriver,
  cleanup,
  createRendererWithUniDriver,
} from '../../../test/utils/unit';
import badgeSelectPrivateDriverFactory from '../BadgeSelect.private.driver';
import { badgeSelectPrivateUniDriverFactory } from '../BadgeSelect.private.uni.driver';

describe('BadgeSelect', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(badgeSelectPrivateDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(badgeSelectPrivateUniDriverFactory));
  });

  function runTests(render) {
    const initialOptionId = 0;
    const options = Object.values(SKIN).map((skin, id) => ({
      id: id.toString(),
      skin,
      text: skin,
    }));

    function createComponent(props = {}) {
      const combinedProps = {
        options,
        selectedId: initialOptionId.toString(),
        ...props,
      };

      return render(<BadgeSelect {...combinedProps} />).driver;
    }

    afterEach(cleanup);

    it('should have a badge and hidden options by default', async () => {
      const { driver, badgeDriver } = createComponent();
      expect(await driver.exists()).toBe(true);
      expect(await driver.isDropdownShown()).toBe(false);
      expect(await badgeDriver.exists()).toBe(true);
    });

    it('should show badge with initial selected skin and text', async () => {
      const { badgeDriver } = createComponent();
      expect(await badgeDriver.getSkin()).toBe(options[initialOptionId].skin);
      expect(await badgeDriver.text()).toBe(options[initialOptionId].text);
    });

    it('should show badge with correct general props as default', async () => {
      const { badgeDriver } = createComponent();
      expect(await badgeDriver.getType()).toBe(TYPE.solid);
      expect(await badgeDriver.getSize()).toBe(SIZE.medium);
      expect(await badgeDriver.isUppercase()).toBe(true);
    });

    it('should show badge with props given', async () => {
      const { badgeDriver } = createComponent({
        type: TYPE.outlined,
        size: SIZE.small,
        uppercase: false,
      });
      expect(await badgeDriver.getType()).toBe(TYPE.outlined);
      expect(await badgeDriver.getSize()).toBe(SIZE.small);
      expect(await badgeDriver.isUppercase()).toBe(false);
    });

    it('should show badge selector when badge is clicked', async () => {
      const { driver, badgeDriver } = createComponent();
      await badgeDriver.click();
      expect(await driver.isDropdownShown()).toBe(true);
    });

    it('should hide options on selection', async () => {
      const { driver } = createComponent();
      await driver.click();
      await driver.clickAtOption(2);
      expect(await driver.isDropdownShown()).toBe(false);
    });

    it('should hide options on outside click', async () => {
      const { driver, badgeDriver } = createComponent();
      await badgeDriver.click();
      expect(await driver.isDropdownShown()).toBe(true);
      await driver.clickOutside();
      expect(await driver.isDropdownShown()).toBe(false);
    });

    it('should call onSelect when an option is selected', async () => {
      const onSelect = jest.fn();
      const selectedIndex = 3;
      const { driver } = createComponent({ onSelect });
      await driver.clickAtOption(selectedIndex);
      expect(onSelect).toBeCalled();
      expect(onSelect).toBeCalledWith(options[selectedIndex]);
    });

    describe('uncontrolled mode', () => {
      it('should pick the first option if no selectedId given', async () => {
        const uncontrolledProps = { selectedId: undefined };
        const { badgeDriver } = createComponent(uncontrolledProps);

        expect(await badgeDriver.getSkin()).toBe(options[0].skin);
        expect(await badgeDriver.text()).toBe(options[0].text);
      });

      it('should change badge after an option is selected', async () => {
        const uncontrolledProps = { selectedId: undefined };
        const { driver, badgeDriver } = createComponent(uncontrolledProps);
        const selectedIndex = 3;

        await driver.clickAtOption(selectedIndex);
        expect(await badgeDriver.getSkin()).toBe(options[selectedIndex].skin);
        expect(await badgeDriver.text()).toBe(options[selectedIndex].text);
      });
    });

    describe('controlled mode', () => {
      it('should not change badge after an option is selected', async () => {
        const { driver, badgeDriver } = createComponent();
        const selectedIndex = 3;

        await driver.clickAtOption(selectedIndex);
        expect(await badgeDriver.getSkin()).toBe(options[initialOptionId].skin);
        expect(await badgeDriver.text()).toBe(options[initialOptionId].text);
      });

      it('should change badge only on selectedIndex change', async () => {
        const dataHook = 'badge-select';
        const { driver, rerender } = render(
          <BadgeSelect
            selectedId={'0'}
            dataHook={dataHook}
            options={options}
          />,
        );

        const selectedIndex = 3;

        await driver.driver.clickAtOption(selectedIndex);

        rerender(
          <BadgeSelect
            selectedId={`${selectedIndex}`}
            dataHook={dataHook}
            options={options}
          />,
        );

        expect(await driver.badgeDriver.getSkin()).toBe(
          options[selectedIndex].skin,
        );
        expect(await driver.badgeDriver.text()).toBe(
          options[selectedIndex].text,
        );
      });
    });
  }
});

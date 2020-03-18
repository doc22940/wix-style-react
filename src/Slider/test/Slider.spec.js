import React from 'react';
import Slider from '../Slider';
import sliderDriverFactory from '../Slider.driver';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/unit';
import { sliderUniDriverFactory } from '../Slider.uni.driver';

describe('Slider', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(sliderDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(sliderUniDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());

    it('should render slider', async () => {
      const onChange = jest.fn(value => this.setState({ value }));
      const props = { value: [3], min: 1, max: 10, onChange };

      const { driver } = render(<Slider {...props} />);

      expect(await driver.numOfSliderDots()).toBe(10);
      expect(await driver.numOfSliderHandles()).toBe(1);
      expect(await driver.isDotSelected(3)).toBe(true);
    });

    it('should show correct value on hover', async () => {
      const onChange = jest.fn(value => this.setState({ value }));
      const props = { value: [3, 5, 7], min: 1, max: 10, onChange };

      const { driver } = render(<Slider {...props} />);

      await driver.hoverHandle({ handleIndex: 0 });

      expect(await driver.getToolTipValue()).toBe(`${props.value[0]}`);

      await driver.unHoverHandle({ handleIndex: 0 });
      await driver.hoverHandle({ handleIndex: 1 });

      expect(await driver.getToolTipValue()).toBe(`${props.value[1]}`);
    });

    it('should not display tooltip if `displayTooltip` is set to false', async () => {
      const onChange = jest.fn(value => this.setState({ value }));
      const props = { value: [4], displayTooltip: false, onChange };

      const { driver } = render(<Slider {...props} />);

      await driver.hoverHandle({ handleIndex: 0 });

      expect(await driver.getToolTipValue()).toBeFalsy();

      await driver.unHoverHandle({ handleIndex: 0 });
    });

    it('should display a disabled slider', async () => {
      const onChange = jest.fn(value => this.setState({ value }));
      const props = { value: 3, onChange, disabled: true };

      const { driver } = render(<Slider {...props} />);

      expect(await driver.isDisabled()).toBe(true);
    });

    describe('custom marks', () => {
      const marks = {
        0: '$0',
        2: '$79',
        4: '$129',
        6: '$199',
        8: '$349',
        10: '$499',
      };

      const commonProps = { marks, min: 0, max: 10, value: 2 };

      it('should render marks when given a "marks" object', async () => {
        const onChange = jest.fn(value => this.setState({ value }));
        const { driver } = render(
          <Slider {...commonProps} onChange={onChange} />,
        );
        expect(await driver.numOfSliderMarksLabels()).toBe(
          Object.values(marks).length,
        );
      });

      it('should display the mark label when hovering the slider handle', async () => {
        const onChange = jest.fn(value => this.setState({ value }));
        const { driver } = render(
          <Slider {...commonProps} onChange={onChange} />,
        );

        await driver.hoverHandle({ handleIndex: 0 });
        expect(await driver.getToolTipValue()).toBe(marks[2]);
        await driver.unHoverHandle({ handleIndex: 0 });
      });

      it('should not display tooltip if the handler has value with no mark label', async () => {
        const onChange = jest.fn(value => this.setState({ value }));
        const { driver } = render(
          <Slider {...commonProps} value={1} onChange={onChange} />,
        );

        await driver.hoverHandle({ handleIndex: 0 });
        expect(await driver.getToolTipValue()).toBeFalsy();
        await driver.unHoverHandle({ handleIndex: 0 });
      });

      it('should display tooltip with the string "0" when label is the number zero', async () => {
        const marks = {
          0: 0,
          1: 5,
          2: 10,
          3: 15,
        };

        const onChange = jest.fn(value => this.setState({ value }));
        const props = { marks, onChange, value: 0, min: 0, max: 3 };
        const { driver } = render(<Slider {...props} />);

        await driver.hoverHandle({ handleIndex: 0 });
        expect(await driver.getToolTipValue()).toBe('0');
        await driver.unHoverHandle({ handleIndex: 0 });
      });
    });

    describe(`Range mode`, () => {
      const multiRangeValue = [3, 5, 7];

      it('should render slider with multi-range', async () => {
        const onChange = jest.fn(value => this.setState({ value }));
        const props = { value: multiRangeValue, min: 1, max: 10, onChange };

        const { driver } = render(<Slider {...props} />);

        expect(await driver.numOfSliderDots()).toBe(10);
        expect(await driver.numOfSliderHandles()).toBe(3);

        props.value.forEach(async selectedValue => {
          expect(await driver.isDotSelected(selectedValue)).toBe(true);
        });
      });

      it('should be enabled when array is given to value prop', async () => {
        const onChange = jest.fn();
        const props = {
          value: multiRangeValue,
          displayTooltip: false,
          onChange,
        };
        const { driver } = render(<Slider {...props} />);
        expect(await driver.numOfSliderHandles()).toBe(props.value.length);
      });
    });

    describe(`Slide mode`, () => {
      it('should be enabled when number is given to value prop', async () => {
        const onChange = jest.fn();
        const props = { value: 2, displayTooltip: false, onChange };
        const { driver } = render(<Slider {...props} />);
        expect(await driver.numOfSliderHandles()).toBe(1);
      });

      it('should be enabled when array with 1 item given to value', async () => {
        const onChange = jest.fn();
        const props = { value: [2], displayTooltip: false, onChange };
        const { driver } = render(<Slider {...props} />);
        expect(await driver.numOfSliderHandles()).toBe(1);
      });
    });
  }
});

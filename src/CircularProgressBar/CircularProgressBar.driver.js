import {
  circularProgressBarDriverFactory as coreCircularProgressBarDriverFactory,
  tooltipDriverFactory as coreTooltipDriverFactory,
} from 'wix-ui-core/drivers/vanilla';
import { dataHooks } from './constants';

export const circularProgressBarDriverFactory = ({
  element,
  eventTrigger,
  wrapper,
}) => {
  const getElementByDataHook = dataHook =>
    element.querySelector(`[data-hook='${dataHook}']`);

  const createTooltipDriver = () =>
    coreTooltipDriverFactory({
      element: getElementByDataHook(dataHooks.tooltip),
      wrapper,
      eventTrigger,
    });

  const coreProgressBarDriver = coreCircularProgressBarDriverFactory({
    element,
    wrapper,
    eventTrigger,
  });

  return {
    ...coreProgressBarDriver,
    isErrorIconShown: () => !!getElementByDataHook(dataHooks.errorIcon),
    isSuccessIconShown: () => !!getElementByDataHook(dataHooks.successIcon),
    getSize: () =>
      getElementByDataHook(dataHooks.circularProgressBar).getAttribute(
        'data-size',
      ),
    getTooltipErrorMessage: () => {
      const tooltipDriver = createTooltipDriver();
      tooltipDriver.mouseEnter();
      return tooltipDriver.getContentElement().textContent;
    },
  };
};

export default circularProgressBarDriverFactory;

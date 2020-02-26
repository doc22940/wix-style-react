import {
  linearProgressBarDriverFactory as coreLinearProgressBarDriverFactory,
  tooltipDriverFactory as coreTooltipDriverFactory,
} from 'wix-ui-core/drivers/vanilla';
import { dataHooks } from './constants';

const linearProgressBarDriverFactory = ({ element, eventTrigger, wrapper }) => {
  const getElementByDataHook = dataHook =>
    element.querySelector(`[data-hook='${dataHook}']`);
  const createTooltipDriver = () =>
    coreTooltipDriverFactory({
      element: getElementByDataHook(dataHooks.tooltip),
      wrapper,
      eventTrigger,
    });

  const coreProgressBarDriver = coreLinearProgressBarDriverFactory({
    element,
    wrapper,
    eventTrigger,
  });

  return {
    ...coreProgressBarDriver,
    isErrorIconShown: () => !!getElementByDataHook(dataHooks.errorIcon),
    isSuccessIconShown: () => !!getElementByDataHook(dataHooks.successIcon),
    getTooltipErrorMessage: () => {
      const tooltipDriver = createTooltipDriver();
      tooltipDriver.mouseEnter();
      return tooltipDriver.getContentElement().textContent;
    },
    getSkin: () => element.getAttribute('data-skin'),
  };
};

export default linearProgressBarDriverFactory;

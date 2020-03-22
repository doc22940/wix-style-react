import { buttonNextDriverFactory } from 'wix-ui-core/drivers/unidriver';
import { tooltipDriverFactory } from '../Tooltip/Tooltip.uni.driver';

export const toggleButtonDriverFactory = (base, body) => {
  const tooltipBaseElement = base.$('[data-hook="toggleButtonTooltip"]');
  const tooltipDriver = tooltipDriverFactory(tooltipBaseElement, body);
  const buttonDriver = buttonNextDriverFactory(base);

  async function getLabelPlacement() {
    return base.attr('data-placement');
  }

  function getTooltipText() {
    return tooltipDriver.getTooltipText();
  }

  // Not using Omit so that AutoDocs will generate properly
  return {
    /** returns true if component exists */
    exists: buttonDriver.exists,
    /** returns the component element */
    element: buttonDriver.element,
    /** click on the element */
    click: buttonDriver.click,
    /** returns true if button is disabled */
    isButtonDisabled: buttonDriver.isButtonDisabled,
    /** returns skin value, applied to a button */
    getSkin: async () => await base.attr('data-skin'),
    /** returns true if button is selected */
    isButtonSelected: async () => (await base.attr('data-selected')) === 'true',
    /** returns label placement value */
    getLabelPlacement,
    /** returns label value */
    getLabelValue: async () => {
      const placement = await getLabelPlacement();

      if (placement === 'tooltip') {
        return getTooltipText();
      }

      return base.$('[data-hook="togglebutton-label"]').text();
    },
  };
};

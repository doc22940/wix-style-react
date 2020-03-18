import { isFocused } from 'wix-ui-test-utils/protractor';
import buttonDriverFactory from './RadioButton/RadioButton.protractor.driver';

const radioGroupDriverFactory = component => {
  const getRadioButtonLabel = index =>
    component.$$(`div [data-hook="radio-label"]`).get(index);
  const getRadioButtonRoot = index =>
    component.all(by.xpath('./div/div')).get(index);

  return {
    getButtonDriver: index => buttonDriverFactory(getRadioButtonRoot(index)),
    getRadioAtIndex: index => getRadioButtonLabel(index),
    selectByIndex: index => getRadioButtonLabel(index).click(),
    isRadioChecked: index =>
      component
        .$$(`div input`)
        .get(index)
        .isSelected(),
    isRadioDisabled: index =>
      !!component
        .$$(`div input`)
        .get(index)
        .getAttribute('disabled'),
    /**
     * @deprecated
     * @see getButtonDriver
     */
    isRadioFocused: index =>
      isFocused(
        component
          .$$(`div label`)
          .get(index)
          .$(`[tabindex="0"]`),
      ),
    element: () => component,
  };
};

export default radioGroupDriverFactory;

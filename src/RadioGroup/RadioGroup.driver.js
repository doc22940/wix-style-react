import toArray from 'lodash/toArray';
import { isClassExists } from '../../test/utils';
import radioButtonDriverFactory from './RadioButton/RadioButton.driver';

const radioGroupDriverFactory = ({ element }) => {
  const radios = () =>
    (toArray(element.children) || []).map(radio =>
      radioButtonDriverFactory({ element: radio }),
    );
  const labels = () => radios().map(radio => radio.getLabelElement());
  const selectedRadio = () => radios().find(radio => radio.isChecked());
  const getRadioByValue = value => {
    const stringValue = value.toString();
    return radios().find(radio => radio.getValue() === stringValue);
  };

  return {
    exists: () => !!element,
    selectByValue: value => getRadioByValue(value).check(),
    selectByIndex: index => radios()[index].check(),
    getRadioValueAt: index => radios()[index].getValue(),
    getRadioAtIndex: index => radios()[index],
    getSelectedValue: () =>
      selectedRadio() ? selectedRadio().getValue() : null,
    isRadioDisabled: index => radios()[index].isDisabled(),
    // TODO: We should deprecate getClassOfLabelAt(). Css tests should be in e2e tests.
    getClassOfLabelAt: index => labels()[index].className,
    isVerticalDisplay: () => isClassExists(element, 'vertical'),
    isHorizontalDisplay: () => isClassExists(element, 'horizontal'),
    isButtonType: () => isClassExists(element, 'buttonType'),
    spacing: () => element.children['1'].style._values['margin-top'],
    lineHeight: () => labels()[0].style._values['line-height'],
    getNumberOfRadios: () => radios().length,
  };
};

export default radioGroupDriverFactory;

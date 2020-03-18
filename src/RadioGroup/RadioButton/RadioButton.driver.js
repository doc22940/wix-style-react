import ReactTestUtils from 'react-dom/test-utils';

const radioButtonDriverFactory = ({ element }) => {
  const radioWrapper = () => element.childNodes[0];
  const radioButton = () => radioWrapper().childNodes[0];
  const label = () => radioWrapper().childNodes[1];

  return {
    exists: () => !!radioWrapper(),
    check: () => ReactTestUtils.Simulate.change(radioButton()),
    isChecked: () => radioButton().checked,
    isDisabled: () => radioButton().disabled,
    getLabel: () => label().textContent,
    getLabelElement: () => label(),
    getValue: () => radioButton().value,
    getTabIndex: () => radioWrapper().getAttribute('tabIndex'),
    getContent: () =>
      element.querySelector('[data-hook="radio-button-content"]'),
  };
};

export default radioButtonDriverFactory;

import ReactTestUtils from 'react-dom/test-utils';

const buttonDriverFactory = ({ element }) => {
  return {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.click(element),
    focus: () => ReactTestUtils.Simulate.focus(element),
    blur: () => ReactTestUtils.Simulate.blur(element),
    mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(element),
    mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(element),
    getButtonTextContent: () => element.textContent,
    isButtonDisabled: () => element.getAttribute('disabled') === '',
    isPrefixIconExists: () => element.innerHTML.indexOf('prefix') !== -1,
    isSuffixIconExists: () => element.innerHTML.indexOf('suffix') !== -1,
  };
};

// For internal use only!
export default buttonDriverFactory;

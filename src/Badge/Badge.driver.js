const badgeDriverFactory = ({ element, eventTrigger }) => {
  return {
    /** checks if element exists */
    exists: () => !!element,
    /** returns elements innerHTML*/
    getContent: () => element.innerHTML,
    /** returns elements text */
    text: () => element.textContent,
    getType: () => element.getAttribute('data-type'),
    getSkin: () => element.getAttribute('data-skin'),
    getSize: () => element.getAttribute('data-size'),
    isUppercase: () => element.getAttribute('data-uppercase') === 'true',
    hasClickCursor: () => element.getAttribute('data-clickable') === 'true',
    click: () => eventTrigger.click(element),
  };
};

export default badgeDriverFactory;

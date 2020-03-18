import { waitForVisibilityOf, isFocused } from 'wix-ui-test-utils/protractor';
import { browser, $ } from 'protractor';
import { dropdownTestkitFactory } from '../../../testkit/protractor';
import { storySettings, testStories } from '../docs/storySettings';
import { createTestStoryUrl } from '../../../test/utils/storybook-helpers';

describe('Dropdown - Focus behaviour', () => {
  let driver;

  const navigateToTestUrl = async testName => {
    const testStoryUrl = createTestStoryUrl({
      category: storySettings.category,
      storyName: storySettings.storyName,
      dataHook: storySettings.dataHook,
      testName,
    });
    await browser.get(testStoryUrl);
  };

  beforeEach(async () => {
    await navigateToTestUrl(testStories.tabsSwitches);

    driver = dropdownTestkitFactory({
      dataHook: storySettings.dataHook,
    });
    await waitForVisibilityOf(
      driver.element(),
      `Cant find ${storySettings.dataHook}`,
    );
  });

  const pressTab = () =>
    browser
      .actions()
      .sendKeys(protractor.Key.TAB)
      .perform();

  async function focusOnDropdown() {
    const firstElement = $(`[data-hook="input-for-initial-focus"]`);

    await pressTab();
    expect(await isFocused(firstElement)).toEqual(true);

    await pressTab();
    expect(await driver.isFocused()).toEqual(true);
  }

  it('should move out focus of dropdown only after a tab press when selecting an item', async () => {
    await focusOnDropdown();
    await driver.hoverItemById(0);
    await pressTab();
    expect(await driver.isFocused()).toEqual(false);
  });
});

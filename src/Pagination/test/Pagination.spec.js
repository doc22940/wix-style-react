import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import Pagination from '../Pagination';
import { paginationPrivateDriverFactory } from './Pagination.private.uni.driver';

describe('Pagination', () => {
  const render = createRendererWithUniDriver(paginationPrivateDriverFactory);

  afterEach(() => {
    cleanup();
  });

  it('should render', async () => {
    const { driver } = render(<Pagination />);

    expect(await driver.exists()).toBe(true);
    expect(await driver.getButtonText()).toEqual('Click me!');
  });

  it('should increment', async () => {
    const { driver } = render(<Pagination />);

    await driver.clickButton();
    await driver.clickButton();

    expect(await driver.getCountText()).toEqual(
      'You clicked this button even number (2) of times',
    );
  });

  it('should allow changing the button text', async () => {
    const { driver } = render(<Pagination buttonText="Press me" />);

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});

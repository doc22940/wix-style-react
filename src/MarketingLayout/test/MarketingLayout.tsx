import * as React from 'react';
import MarketingLayout from '..';
import { marketingLayoutTestkitFactory } from '../../../testkit';
import { marketingLayoutTestkitFactory as marketingLayoutEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { marketingLayoutTestkitFactory as marketingLayoutPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function marketingLayoutWithMandatoryProps() {
  return <MarketingLayout />;
}

function marketingLayoutWithAllProps() {
  return (
    <MarketingLayout
      dataHook="string"
      image={<img alt="alt" />}
      imageBackgroundColor="string"
      size="small"
      inverted
      actions={<div />}
      title="title"
      description="description"
    />
  );
}

async function testkits() {
  const testkit = marketingLayoutTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = marketingLayoutEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await marketingLayoutPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

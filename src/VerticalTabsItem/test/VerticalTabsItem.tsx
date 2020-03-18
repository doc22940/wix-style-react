import * as React from 'react';
import VerticalTabsItem from '..';
import { verticalTabsItemTestkitFactory } from '../../../testkit';
import { verticalTabsItemTestkitFactory as verticalTabsItemEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { verticalTabsItemTestkitFactory as verticalTabsItemPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function VerticalTabsItemWithMandatoryProps() {
  return <VerticalTabsItem />;
}

function VerticalTabsItemWithAllProps() {
  return (
    <VerticalTabsItem
      dataHook="hook"
      disabled
      id={1}
      prefixIcon={<div />}
      suffixIcon={<div />}
      type="action"
    />
  );
}

async function testkits() {
  const testkit = verticalTabsItemTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = verticalTabsItemEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await verticalTabsItemPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}

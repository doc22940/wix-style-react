import * as React from 'react';
import Divider from '..';
import { dividerTestkitFactory } from '../../../testkit';
import { dividerTestkitFactory as dividerEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { dividerTestkitFactory as dividerPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function dividerWithMandatoryProps() {
  return <Divider />;
}

function dividerWithAllProps() {
  return (
    <Divider
      dataHook="dataHook"
      direction="horizontal"
      skin="dark"
    />
  );
}

async function testkits() {
  const testkit = dividerTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = dividerEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await dividerPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

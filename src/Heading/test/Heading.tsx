import * as React from 'react';
import Heading from '..';
import { headingTestkitFactory } from '../../../testkit';
import { headingTestkitFactory as headingEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { headingTestkitFactory as headingPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function HeadingWithMandatoryProps() {
  return <Heading />;
}

function HeadingWithAllProps() {
  return <Heading dataHook="hook" appearance="H2" light ellipsis />;
}

async function testkits() {
  const testkit = headingTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = headingEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await headingPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}

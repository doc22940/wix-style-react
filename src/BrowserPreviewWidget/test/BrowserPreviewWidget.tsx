import * as React from 'react';
import BrowserPreviewWidget from '..';
import { browserPreviewWidgetTestkitFactory } from '../../../testkit';
import { browserPreviewWidgetTestkitFactory as browserPreviewWidgetEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { browserPreviewWidgetTestkitFactory as browserPreviewWidgetPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function browserPreviewWidgetWithMandatoryProps() {
  return <BrowserPreviewWidget children="" />;
}

function browserPreviewWidgetWithAllProps() {
  return (
    <BrowserPreviewWidget
      dataHook="string"
      skin="gradient"
      backgroundColor="red"
      browserBarSize="size12"
      height="3px"
      width="3px"
      children=""
    />
  );
}

async function testkits() {
  const testkit = browserPreviewWidgetTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = browserPreviewWidgetEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await browserPreviewWidgetPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

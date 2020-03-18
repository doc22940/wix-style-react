import * as React from 'react';
import PreviewWidget from '..';
import { previewWidgetTestkitFactory } from '../../../testkit';
import { previewWidgetTestkitFactory as previewWidgetEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { previewWidgetTestkitFactory as previewWidgetPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function previewWidgetWithMandatoryProps() {
  return <PreviewWidget children="" />;
}

function previewWidgetWithAllProps() {
  return (
    <PreviewWidget
      dataHook="dataHook"
      skin="gradient"
      contentOutline="border"
      backgroundColor="red"
      height="3px"
      width="3px"
      children=""
    />
  );
}

async function testkits() {
  const testkit = previewWidgetTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = previewWidgetEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await previewWidgetPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

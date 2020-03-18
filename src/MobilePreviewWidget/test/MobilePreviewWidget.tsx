import * as React from 'react';
import MobilePreviewWidget, {
  MobilePreviewWidgetSkin,
} from '..';
import { mobilePreviewWidgetTestkitFactory } from '../../../testkit';
import { mobilePreviewWidgetTestkitFactory as mobilePreviewWidgetEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { mobilePreviewWidgetTestkitFactory as mobilePreviewWidgetPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function mobilePreviewWidgetWithMandatoryProps() {
  return <MobilePreviewWidget children={<div />} />;
}

function mobilePreviewWidgetWithAllProps() {
  return (
    <MobilePreviewWidget
      dataHook="dh"
      skin="gradient"
      backgroundColor="red"
      height="10px"
      width="10px"
      children={<div />}
    />
  );
}

async function testkits() {
  const testkit = mobilePreviewWidgetTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = mobilePreviewWidgetEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await mobilePreviewWidgetPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

import * as React from 'react';
import ModalMobileLayout from '..';
import { modalMobileLayoutTestkitFactory } from '../../../testkit';
import { modalMobileLayoutTestkitFactory as modalMobileLayoutEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { modalMobileLayoutTestkitFactory as modalMobileLayoutPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function ModalMobileLayoutWithMandatoryProps() {
  return <ModalMobileLayout />;
}

function ModalMobileLayoutWithAllProps() {
  return (
    <ModalMobileLayout
      content={<div />}
      dataHook="hook"
      footer={<div />}
      fullscreen
      onCloseButtonClick={_ev => {}}
      onOverlayClick={() => {}}
      stickyFooter
      stickyTitle
      title={<div />}
    />
  );
}

async function testkits() {
  const testkit = modalMobileLayoutTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = modalMobileLayoutEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await modalMobileLayoutPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}

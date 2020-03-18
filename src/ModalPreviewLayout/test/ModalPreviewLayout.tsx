import * as React from 'react';
import ModalPreviewLayout from '..';
import { modalPreviewLayoutTestkitFactory } from '../../../testkit';
import { modalPreviewLayoutTestkitFactory as modalPreviewLayoutEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { modalPreviewLayoutTestkitFactory as modalPreviewLayoutPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function ModalPreviewLayoutWithMandatoryProps() {
  return <ModalPreviewLayout onClose={() => {}}>asd</ModalPreviewLayout>;
}

function ModalPreviewLayoutWithAllProps() {
  return (
    <ModalPreviewLayout
      onClose={() => {}}
      actions={<div />}
      dataHook="hook"
      title="title"
      shouldCloseOnOverlayClick>
      asd
    </ModalPreviewLayout>
  );
}

async function testkits() {
  const testkit = modalPreviewLayoutTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = modalPreviewLayoutEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await modalPreviewLayoutPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}

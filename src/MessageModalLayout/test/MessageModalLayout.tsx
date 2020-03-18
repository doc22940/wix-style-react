import * as React from 'react';
import MessageModalLayout from '..';
import { messageModalLayoutTestkitFactory } from '../../../testkit';
import { messageModalLayoutTestkitFactory as messageModalLayoutEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { messageModalLayoutTestkitFactory as messageModalLayoutPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function messageModalLayoutWithMandatoryProps() {
  return <MessageModalLayout illustration="" theme="standard" children="" />;
}

function messageModalLayoutWithAllProps() {
  return (
    <MessageModalLayout
      dataHook="string"
      className="className"
      illustration=""
      theme="standard"
      children=""
    />
  );
}

async function testkits() {
  const testkit = messageModalLayoutTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = messageModalLayoutEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await messageModalLayoutPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

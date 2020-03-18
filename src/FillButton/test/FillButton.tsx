import * as React from 'react';
import FillButton from '..';
import { fillButtonTestkitFactory } from '../../../testkit';
import { fillButtonTestkitFactory as fillButtonEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { fillButtonTestkitFactory as fillButtonPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function FillButtonWithMandatoryProps() {
  return <FillButton />;
}

function FillButtonWithAllProps() {
  return (
    <FillButton
      type="submit"
      onClick={_ev => {}}
      iconSize="medium"
      disabled
      fill="red"
      tooltipProps={{}}
      dataHook="hook"
    />
  );
}

async function testkits() {
  const testkit = fillButtonTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = fillButtonEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await fillButtonPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}

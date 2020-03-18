import * as React from 'react';
import ToggleButton from '..';
import { toggleButtonTestkitFactory } from '../../../testkit';
import { toggleButtonTestkitFactory as toggleButtonEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { toggleButtonTestkitFactory as toggleButtonPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function ToggleButtonWithMandatoryProps() {
  return <ToggleButton />;
}

function ToggleButtonWithAllProps() {
  return (
    <ToggleButton
      as="a"
      dataHook="hook"
      disabled
      onClick={_ev => {}}
      selected
      skin="dark"
      tooltipContent="content"
      tooltipProps={{}}
    />
  );
}

async function testkits() {
  const testkit = toggleButtonTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = toggleButtonEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await toggleButtonPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}

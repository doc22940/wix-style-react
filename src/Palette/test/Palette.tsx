import * as React from 'react';
import Palette from '..';
import { paletteTestkitFactory } from '../../../testkit';
import { paletteTestkitFactory as paletteEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { paletteTestkitFactory as palettePuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function paletteWithMandatoryProps() {
  return <Palette />;
}

function paletteWithAllProps() {
  return <Palette dataHook="datahook" buttonText="text!" />;
}

async function testkits() {
  const testkit = paletteTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = paletteEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await palettePuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

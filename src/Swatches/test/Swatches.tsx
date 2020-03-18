import * as React from 'react';
import Swatches from '..';
import { swatchesTestkitFactory } from '../../../testkit';
import { swatchesTestkitFactory as swatchesEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { swatchesTestkitFactory as swatchesPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function SwatchesWithMandatoryProps() {
  return <Swatches/>;
}

function SwatchesWithAllProps() {
  return (
    <Swatches
      colors={["blue", "green"]}
      selected={"blue"}
      dataHook={"hook"}
      onClick={()=>{}}
      size={'small'}
      showClear={false}
      showClearMessage={<div/>}
      onAdd={()=>{}}
      onChange={()=>{}}
      onCancel={()=>{}}
      showAddButton={true}
      addButtonMessage="msg"
      addButtonIconSize="small"
      columns={10}
      gap={30}
    />
  );
}

async function testkits() {
  const testkit = swatchesTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = swatchesEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await swatchesPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}

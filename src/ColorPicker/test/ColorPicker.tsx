import * as React from 'react';
import * as color from 'color';
import ColorPicker from '..';
import { colorPickerTestkitFactory } from '../../../testkit';
import { colorPickerTestkitFactory as colorPickerEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { colorPickerTestkitFactory as colorPickerPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function ColorPickerWithMandatoryProps() {
  return (
    <ColorPicker
      value={'blue'}
      onChange={color => {}}
      onCancel={color => {}}
      onConfirm={color => {}}
    />
  );
}

function ColorPickerWithAllProps() {
  return (
    <ColorPicker
      dataHook={'datahook'}
      value={color.rgb([1, 2, 3])}
      showHistory
      showConverter={false}
      showInput={false}
      onChange={color => {
        if (typeof color !== 'string') {
          color.hex();
        } else {
          color.toUpperCase();
        }
      }}
      onCancel={color => {
        if (typeof color !== 'string') {
          color.hex();
        } else {
          color.toUpperCase();
        }
      }}
      onConfirm={color => {
        if (typeof color !== 'string') {
          color.hex();
        } else {
          color.toUpperCase();
        }
      }}
      onAdd={color => {
        if (typeof color !== 'string') {
          color.hex();
        } else {
          color.toUpperCase();
        }
      }}
      addTooltipContent={<div />}
      allowEmpty
      emptyPlaceholder={'i am a placeholder'}
    />
  );
}

async function testkits() {
  const testkit = colorPickerTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = colorPickerEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await colorPickerPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

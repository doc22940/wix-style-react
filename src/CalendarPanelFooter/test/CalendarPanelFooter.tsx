import * as React from 'react';
import CalendarPanelFooter from '..';
import { calendarPanelFooterTestkitFactory } from '../../../testkit';
import { calendarPanelFooterTestkitFactory as calendarPanelFooterEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { calendarPanelFooterTestkitFactory as calendarPanelFooterPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function CalendarPanelFooterWithMandatoryProps() {
  return (
    <CalendarPanelFooter
      primaryActionLabel={'str'}
      secondaryActionLabel={'str'}
      primaryActionDisabled
      primaryActionOnClick={_ev => {}}
      secondaryActionOnClick={_ev => {}}
      dateToString={selectedDays => 'converted'}
    />
  );
}

function CalendarPanelFooterWithAllProps() {
  return (
    <CalendarPanelFooter
      dataHook="hook"
      primaryActionLabel={'str'}
      secondaryActionLabel={'str'}
      primaryActionDisabled
      primaryActionOnClick={_ev => {}}
      secondaryActionOnClick={_ev => {}}
      selectedDays={new Date()}
      dateToString={selectedDays => 'converted'}
    />
  );
}

async function testkits() {
  const testkit = calendarPanelFooterTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = calendarPanelFooterEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await calendarPanelFooterPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

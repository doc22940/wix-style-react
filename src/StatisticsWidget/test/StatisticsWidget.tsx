import * as React from 'react';
import StatisticsWidget from '..';
import { statisticsWidgetTestkitFactory } from '../../../testkit';
import { statisticsWidgetTestkitFactory as statisticsWidgetEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { statisticsWidgetTestkitFactory as statisticsWidgetPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function StatisticsWidgetWithMandatoryProps() {
  return <StatisticsWidget />;
}

function StatisticsWidgetWithAllProps() {
  return (
    <StatisticsWidget
      dataHook="hook"
      items={[
        { value: '' },
        {
          value: 'val',
          description: 'desc',
          descriptionInfo: 'desc',
          invertedPercentage: true,
          percentage: 10,
          valueInShort: 'val',
          onClick: _ev => {},
        },
      ]}
    />
  );
}

async function testkits() {
  const testkit = statisticsWidgetTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = statisticsWidgetEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await statisticsWidgetPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

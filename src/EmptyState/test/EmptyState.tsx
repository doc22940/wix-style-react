import * as React from 'react';
import EmptyState from '..';
import { emptyStateTestkitFactory } from '../../../testkit';
import { emptyStateTestkitFactory as emptyStateEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { emptyStateTestkitFactory as emptyStatePuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function EmptyStateWithMandatoryProps() {
  return <EmptyState />;
}

function EmptyStateWithAllProps() {
  return (
    <EmptyState
      classNames={{ imageContainer: 'cls' }}
      dataHook="hook"
      image={<img />}
      subtitle="subtitle"
      theme="page"
      title="title"
      align="center"
    />
  );
}

async function testkits() {
  const testkit = emptyStateTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = emptyStateEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await emptyStatePuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}

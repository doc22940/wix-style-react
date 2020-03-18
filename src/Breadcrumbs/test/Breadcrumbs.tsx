import * as React from 'react';
import Breadcrumbs, { BreadcrumbsItem } from '..';
import { breadcrumbsTestkitFactory } from '../../../testkit';
import { breadcrumbsTestkitFactory as breadcrumbsEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { breadcrumbsTestkitFactory as breadcrumbsPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function breadcrumbsWithMandatoryProps() {
  return (
    <Breadcrumbs
      items={[
        {
          id: 5,
          value: 'Five',
        },
      ]}
    />
  );
}

function breadcrumbsWithAllProps() {
  return (
    <Breadcrumbs
      items={[
        {
          id: 5,
          value: 'Five',
          link: 'link',
          customElement: <div />,
          disabled: true,
        },
      ]}
      onClick={(item: BreadcrumbsItem) => {}}
      activeId={5}
      size="medium"
      theme="onDarkBackground"
    />
  );
}

async function testkits() {
  const testkit = breadcrumbsTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = breadcrumbsEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await breadcrumbsPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

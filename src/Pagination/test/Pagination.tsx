import * as React from 'react';
import Pagination from '..';
import { paginationTestkitFactory } from '../../../testkit';
import { paginationTestkitFactory as paginationEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { paginationTestkitFactory as paginationPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function paginationWithMandatoryProps() {
  return <Pagination />;
}

function paginationWithAllProps() {
  return (
    <Pagination
      dataHook="dataHook"
      className="className"
      buttonText="buttonText"
    />
  );
}

async function testkits() {
  const testkit = paginationTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = paginationEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await paginationPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

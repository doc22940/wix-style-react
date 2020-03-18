import * as React from 'react';
import SocialPreview from '..';
import { socialPreviewTestkitFactory } from '../../../testkit';
import { socialPreviewTestkitFactory as socialPreviewEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { socialPreviewTestkitFactory as socialPreviewPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function SocialPreviewWithMandatoryProps() {
  return <SocialPreview />;
}

function SocialPreviewWithAllProps() {
  return (
    <SocialPreview
     dataHook="hook"
     description="description"
     media={<div />}
     previewUrl="url"
     title="title"
    />
  );
}

async function testkits() {
  const testkit = socialPreviewTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = socialPreviewEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await socialPreviewPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}

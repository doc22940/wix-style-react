import * as React from 'react';
import Text from '..';
import { textTestkitFactory } from '../../../testkit';
import { textTestkitFactory as textEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { textTestkitFactory as textPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function TextWithMandatoryProps() {
  return <Text />;
}

function TextWithAllProps() {
  return (
    <Text
      className="cssssss"
      size="tiny"
      light
      secondary
      skin="standard"
      tagName="marquee"
      weight="thin"
      appendTo={document.createElement('div')}
      dataHook="hook"
      ellipsis
      fixed
      flip
      hideDelay={500}
      maxWidth="500px"
      placement="auto"
      showDelay={300}
      timeout={300}
      zIndex={1}
      showTooltip
    />
  );
}

function TextAsSpanProps() {
  return <Text tagName="span" onClick={_ => {}} />;
}

function TextAsAnchorProps() {
  return <Text tagName="a" onClick={_ => {}} />;
}

async function testkits() {
  const testkit = textTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = textEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await textPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

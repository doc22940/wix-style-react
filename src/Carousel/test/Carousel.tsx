import * as React from 'react';
import Carousel from '..';
import { carouselTestkitFactory } from '../../../testkit';
import { carouselTestkitFactory as carouselEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { carouselTestkitFactory as carouselPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function CarouselWithMandatoryProps() {
  return <Carousel />;
}

function CarouselWithAllProps() {
  return (
    <Carousel
      afterChange={_s => {}}
      autoplay
      beforeChange={(_old, _new) => {}}
      buttonSkin="inverted"
      className="cls"
      dataHook="hook"
      dots
      images={[{ src: 'a' }]}
      infinite
      initialSlideIndex={1}
      variableWidth
    />
  );
}
document.querySelectorAll;
async function testkits() {
  const testkit = carouselTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = carouselEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await carouselPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}

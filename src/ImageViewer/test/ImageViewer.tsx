import * as React from 'react';
import ImageViewer from '..';
import { imageViewerTestkitFactory } from '../../../testkit';
import { imageViewerTestkitFactory as imageViewerEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { imageViewerTestkitFactory as imageViewerPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function ImageViewerWithMandatoryProps() {
  return <ImageViewer />;
}

function ImageViewerWithAllProps() {
  return (
    <ImageViewer
      addImageInfo=""
      disabled
      error
      errorMessage=""
      height=""
      imageUrl=""
      onAddImage={_ev => {}}
      onImageLoad={_ev => {}}
      onRemoveImage={_ev => {}}
      onUpdateImage={_ev => {}}
      removeImageInfo=""
      removeRoundedBorders
      showRemoveButton
      showUpdateButton
      tooltipProps={{}}
      updateImageInfo=""
      width=""
      dataHook={'hook'}
      className={'class1'}
      status={'error'}
      statusMessage={'some message'}
    />
  );
}

async function testkits() {
  const testkit = imageViewerTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = imageViewerEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await imageViewerPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}

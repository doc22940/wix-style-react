import * as React from 'react';
import RichTextInputArea from '..';
import { richTextInputAreaTestkitFactory } from '../../../testkit';
import { richTextInputAreaTestkitFactory as richTextInputAreaEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { richTextInputAreaTestkitFactory as richTextInputAreaPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function RichTextInputAreaWithMandatoryProps() {
  return <RichTextInputArea onChange={() => {}} />;
}

function RichTextInputAreaWithAllProps() {
  return (
    <RichTextInputArea
      dataHook="value"
      initialValue="value"
      placeholder="value"
      disabled={true}
      status="error"
      statusMessage="value"
      onChange={(value:any) => {}}
      maxHeight="value"
      texts={{
        toolbarButtons: {
          boldButtonLabel: "value",
          italicButtonLabel: "value",
          underlineButtonLabel: "value",
          linkButtonLabel: "value",
          bulletedListButtonLabel: "value",
          numberedListButtonLabel: "value",
        },
        insertionForm: {
          confirmButtonLabel: "value",
          cancelButtonLabel: "value",
          link: {
            textInputPlaceholder: "value",
            urlInputPlaceholder: "value",
          },
        }
      }}
    />
  );
}

function testInstanceMethods() {
  const instance = new RichTextInputArea({});
  instance.setValue('some value');
}

async function testkits() {
  const testkit = richTextInputAreaTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = richTextInputAreaEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await richTextInputAreaPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}

import * as React from "react";
import EditableTitle from "../../src/EditableTitle";
import { editableTitleTestkitFactory } from "../../dist/testkit";
import { editableTitleTestkitFactory as editableTitleEnzymeTestkitFactory } from "../../dist/testkit/enzyme";
import { editableTitleTestkitFactory as editableTitlePuppeteerTestkitFactory } from "../../dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function EditableTitleWithMandatoryProps() {
  return <EditableTitle />;
}

function EditableTitleWithAllProps() {
  return (
    <EditableTitle
      dataHook="hook"
      initialValue="some val"
      defaultValue="blabla"
      onSubmit={_val=>{}}
      maxLength={10}
      autoFocus
    />
  );
}

async function testkits() {
  const testkit = editableTitleTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = editableTitleEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await editableTitlePuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}

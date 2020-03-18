import * as React from "react";
import SidebarDivider from '..';
import { sidebarDividerTestkitFactory } from '../../../testkit';
import { sidebarDividerTestkitFactory as sidebarDividerEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { sidebarDividerTestkitFactory as sidebarDividerPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function SidebarDividerWithMandatoryProps() {
  return <SidebarDivider />;
}

function SidebarDividerWithAllProps() {
  return <SidebarDivider dataHook="hook" fullWidth />;
}

async function testkits() {
  const testkit = sidebarDividerTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = sidebarDividerEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await sidebarDividerPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}

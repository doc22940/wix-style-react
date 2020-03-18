import * as React from "react";
import SidebarSectionTitle from '..';
import { sidebarSectionTitleTestkitFactory } from '../../../testkit';
import { sidebarSectionTitleTestkitFactory as sidebarSectionTitleEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { sidebarSectionTitleTestkitFactory as sidebarSectionTitlePuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function SidebarSectionTitleWithMandatoryProps() {
  return <SidebarSectionTitle>asd</SidebarSectionTitle>;
}

function SidebarSectionTitleWithAllProps() {
  return <SidebarSectionTitle dataHook="hook">asd</SidebarSectionTitle>;
}

async function testkits() {
  const testkit = sidebarSectionTitleTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = sidebarSectionTitleEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await sidebarSectionTitlePuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}

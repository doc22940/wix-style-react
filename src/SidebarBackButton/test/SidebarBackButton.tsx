import * as React from "react";
import SidebarBackButton from '..';
import { sidebarBackButtonTestkitFactory } from '../../../testkit';
import { sidebarBackButtonTestkitFactory as sidebarBackButtonEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { sidebarBackButtonTestkitFactory as sidebarBackButtonPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function SidebarBackButtonWithMandatoryProps() {
  return <SidebarBackButton />;
}

function SidebarBackButtonWithAllProps() {
  return (
    <SidebarBackButton animateArrow dataHook="hook" onClick={_ev => {}}>
      text
    </SidebarBackButton>
  );
}

async function testkits() {
  const testkit = sidebarBackButtonTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = sidebarBackButtonEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await sidebarBackButtonPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}

import * as React from 'react';
import { mount } from 'enzyme';

import SidePanel from '..';
import Box from '../../Box';
import { sidePanelTestkitFactory } from '../../../testkit';
import { sidePanelTestkitFactory as sidePanelEnzymeTestkitFactory } from '../../../testkit/enzyme';

async function testkits() {
  const vanilla = sidePanelTestkitFactory({
    dataHook: 'test',
    wrapper: document.createElement('div'),
  });

  await vanilla.exists();
  await vanilla.element();
  await vanilla.click();
  const vanillTitle: string = await vanilla.getTitleText();

  const enzyme = sidePanelEnzymeTestkitFactory({
    dataHook: 'test',
    wrapper: mount(<div />),
  });

  await enzyme.exists();
  await enzyme.element();
  await enzyme.click();
  const enzymeTitle: string = await enzyme.getTitleText();
}

function SidePanelTest() {
  return (
    <SidePanel>
      <SidePanel.Header title="Title" infoTooltipContent="Tooltip" />
      <SidePanel.Content>
        <Box
          background="#fafafa"
          height="200px"
          align="center"
          verticalAlign="middle"
        >
          content goes here
        </Box>
      </SidePanel.Content>
      <SidePanel.Footer>
        <Box align="right">Footer</Box>
      </SidePanel.Footer>
    </SidePanel>
  );
}

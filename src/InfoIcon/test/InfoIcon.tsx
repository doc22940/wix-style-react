import * as React from 'react';
import {mount} from 'enzyme';

import InfoIcon from '..';
import {infoIconTestkitFactory} from '../../../testkit';
import {infoIconTestkitFactory as infoIconEnzymeTestkitFactory} from '../../../testkit/enzyme';

async function testkits() {
  const vanilla = infoIconTestkitFactory({
    dataHook: 'test',
    wrapper: document.createElement('div')
  });

  await vanilla.exists();
  await vanilla.element();
  await vanilla.click();
  await vanilla.hover();
  const vanillaSize: string = await vanilla.getSize();
  const vanillaContent: string = await vanilla.getContent();

  const enzyme = infoIconEnzymeTestkitFactory({
    dataHook: 'test',
    wrapper: mount(<div />)
  });

  await enzyme.exists();
  await enzyme.element();
  await enzyme.click();
  await enzyme.hover();
  const enzymeSize: string = await enzyme.getSize();
  const enzymecontent: string = await enzyme.getContent();
}

function InfoIconWithMandatoryProps() {
  return <InfoIcon content="test" />;
}

function InfoIconWithAllProps() {
  return (
    <InfoIcon
      content="test"
      size="small"
      dataHook="hook"
      tooltipProps={{
        placement: 'right',
      }}
    />
  );
}

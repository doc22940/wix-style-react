import * as React from 'react';
import Box from '..';
import { boxTestkitFactory } from '../../../testkit';
import { boxTestkitFactory as boxEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { mount } from 'enzyme';

function testkits() {
  const vanilla = boxTestkitFactory({
    dataHook: 'hi',
    wrapper: document.createElement('div'),
  });

  vanilla.exists();
  vanilla.click();

  const enzyme = boxEnzymeTestkitFactory({
    dataHook: 'shbem',
    wrapper: mount(<div />),
  });
}

function BoxWithMandatoryProps() {
  return <Box />;
}

function BoxWithAllProps() {
  return (
    <Box
      align="center"
      className="some-random-classname"
      backgroundColor="red"
      borderBottomColor="red"
      borderColor="red"
      borderLeftColor="red"
      borderRightColor="red"
      borderTopColor="red"
      color="red"
      dataHook="hook"
      direction="horizontal"
      height={80}
      inline
      margin="10px"
      marginBottom="10px"
      marginLeft="10px"
      marginRight="10px"
      marginTop="10px"
      maxHeight={80}
      maxWidth="80px"
      minHeight={80}
      minWidth="80px"
      padding="10px"
      paddingBottom="10px"
      paddingLeft="10px"
      paddingRight="10px"
      paddingTop="10px"
      verticalAlign="bottom"
      width="80px"
    />
  );
}

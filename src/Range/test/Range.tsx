import * as React from 'react';
import Range from '..';
import { rangeTestkitFactory } from '../../../testkit';
import { rangeTestkitFactory as rangeEnzymeTestkitFactory } from '../../../testkit/enzyme';
import * as enzyme from 'enzyme';

function RangeWithMandatoryProps() {
  return <Range />;
}

function RangeWithAllProps() {
  return (
    <Range
      required
      info={"info"}
      dataHook={"hook"}
      appendToParent
      children={<div/>}
    />
  );
}

async function testkits() {
  const testkit = rangeTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = rangeEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });
}

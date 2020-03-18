import * as React from 'react';
import Badge, { SIZE, TYPE, SKIN } from '..';
import {badgeTestkitFactory} from '../../../testkit';
import {badgeTestkitFactory as badgeEnzymeTestkitFactory} from '../../../testkit/enzyme';
import {mount} from 'enzyme';

function testkits() {
  const vanilla = badgeTestkitFactory({
    dataHook: 'hi',
    wrapper: document.createElement('div')
  });

  vanilla.exists();
  vanilla.getSkin();

  const enzyme = badgeEnzymeTestkitFactory({
    dataHook: 'shbem',
    wrapper: mount(<div />)
  });
}

function BadgeWithMandatoryProps() {
  return <Badge />;
}

function BadgeWithAllProps() {
  return (
    <Badge
      type={TYPE.outlined}
      skin={SKIN.danger}
      size={SIZE.medium}
      prefixIcon={<div />}
      suffixIcon={<div />}
      onBlur={() => undefined}
      onFocus={() => undefined}
      onClick={e => undefined}
      uppercase
    />
  );
}

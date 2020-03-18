import * as React from 'react';
import {mount} from 'enzyme';
import Avatar from '..';
import {avatarTestkitFactory} from '../../../testkit';
import {avatarTestkitFactory as avatarEnzymeTestkitFactory} from '../../../testkit/enzyme';

async function testkits() {
  const vanilla = avatarTestkitFactory({
    dataHook: 'hi',
    wrapper: document.createElement('div')
  });

  await vanilla.exists();
  await vanilla.getTextContent();

  const enzyme = avatarEnzymeTestkitFactory({
    dataHook: 'shbem',
    wrapper: mount(<div />)
  });
}

function AvatarWithMandatoryProps() {
  return <Avatar />;
}

function AvatarWithAllProps() {
  return (
    <Avatar
      className="some-class"
      name="as"
      size="size90"
      ariaLabel="asasas"
      color="A1"
      dataHook="sadasd"
      imgProps={{alt: 'asd'}}
      placeholder={<div />}
      text="some text"
      title="some title"
      shape="circle"
      presence="online"
      indication={<div />}
      onIndicationClick={() => {}}
      onClick={() => {}}
      showIndicationOnHover
    />
  );
}

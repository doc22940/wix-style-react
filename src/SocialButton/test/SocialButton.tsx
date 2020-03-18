import * as React from 'react';
import SocialButton from '..';
import { socialButtonTestkitFactory } from '../../../testkit';

async function testkits() {
  const vanilla = socialButtonTestkitFactory({
    dataHook: 'hi',
    wrapper: document.createElement('div'),
  });

  await vanilla.exists();
  await vanilla.click();
}

function SocialButtonWithMandatoryProps() {
  return <SocialButton />;
}

function SocialButtonWithAllProps() {
  return (
    <SocialButton disabled icon="facebook" text='asasd' onClick={() => console.log('')} />
  );
}

import * as React from 'react';
import FloatingHelper from '..';
import { floatingHelperTestkitFactory } from '../../../testkit';
import { floatingHelperTestkitFactory as floatingHelperEnzymeTestkitFactory } from '../../../testkit/enzyme';
import * as enzyme from 'enzyme';

function FloatingHelperWithMandatoryProps() {
  return (
    <FloatingHelper target={<div />} content={<div />} placement="auto">
      <FloatingHelper.Content body="hello" />
    </FloatingHelper>
  );
}

function FloatingHelperWithAllProps() {
  return (
    <FloatingHelper
      dataHook='floating-helper-data-hook'
      width={12}
      target={<div />}
      content={<FloatingHelper.Content
        body="hello"
        title="title"
        actionText="action text"
        actionTheme="standard"
        appearance="dark"
        footer={<div />}
        image={<div />}
        onActionClick={() => {}}
      />}
      onClose={() => {}}
      placement="auto"
      appearance="dark"
      hideDelay={100}
      zIndex={1000}
      moveBy={{ x: 1, y: 1 }}
      initiallyOpened={false}
      opened
      appendTo="viewport"
      onOpen={() => {}}
    />
  );
}

function testInstanceMethods() {
  const instance = new FloatingHelper({
    target: null,
    content: null,
    placement: 'auto',
  });
  instance.open();
  instance.close();
}

async function testkits() {
  const testkit = floatingHelperTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = floatingHelperEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });
}

import * as React from 'react';
import TableActionCell from '..';
import { tableActionCellTestkitFactory } from '../../../testkit';
import { tableActionCellTestkitFactory as tableActionCellEnzymeTestkitFactory } from '../../../testkit/enzyme';
import * as enzyme from 'enzyme';

function tableActionCellWithMandatoryProps() {
  return <TableActionCell />;
}

function tableActionCellWithAllProps() {
  return (
    <TableActionCell
      alwaysShowSecondaryActions
      dataHook="hook"
      numOfVisibleSecondaryActions={2}
      popoverMenuProps={{}}
      primaryAction={{
        disabled: true,
        onClick: () => {},
        text: 'text',
        theme: 'fullblue',
      }}
      secondaryActions={[
        {
          dataHook: 'hook',
          disabled: true,
          icon: <div />,
          onClick: () => {},
          text: 'text',
        },
      ]}
    />
  );
}

async function testkits() {
  const testkit = tableActionCellTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = tableActionCellEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });
}

import * as React from 'react';
import Collapse from '..';

function CollapseWithMandatoryProps() {
  return <Collapse />;
}

function CollapseWithAllProps() {
  return (
    <Collapse dataHook="hook" open>
      Text
    </Collapse>
  );
}

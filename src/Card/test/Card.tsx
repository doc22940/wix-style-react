import * as React from 'react';
import Card from '..';

function CardWithMandatoryProps() {
  return <Card />;
}

function CardWithAllProps() {
  return (
    <Card
      className="cls"
      dataHook="hook"
      hideOverflow
      stretchVertically
    >
        content..
    </Card>
  );
}

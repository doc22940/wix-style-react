import React from 'react';
import { storiesOf } from '@storybook/react';

import Input from '../index';
import Search from 'wix-ui-icons-common/Search';
import AllInputs from './AllInputs';

const defaultProps = {
  value: 'Some text value...',
};

const groupSuffix = (
  <Input.Group>
    <Input.IconAffix>
      <Search />
    </Input.IconAffix>
    <Input.Affix>$</Input.Affix>
  </Input.Group>
);

const tests = [
  {
    describe: 'status',
    its: [
      {
        it: 'error',
        props: {
          status: 'error',
        },
      },
      {
        it: 'warning',
        props: {
          status: 'warning',
        },
      },
    ],
  },
  {
    describe: 'prefix',
    its: [
      {
        it: 'render a node based',
        props: {
          prefix: groupSuffix,
        },
      },
      {
        it: 'render string based',
        props: {
          prefix: <Input.Affix>@</Input.Affix>,
        },
      },
    ],
  },
  {
    describe: 'disabled',
    its: [
      {
        it: 'simple',
        props: {
          disabled: true,
        },
      },
    ],
  },
  {
    describe: 'readonly',
    its: [
      {
        it: 'example',
        props: {
          readOnly: true,
        },
      },
    ],
  },
  {
    describe: 'rounded',
    its: [
      {
        it: 'example',
        props: {
          roundInput: true,
        },
      },
    ],
  },
  {
    describe: 'size',
    its: [
      {
        it: 'small',
        props: {
          size: 'small',
        },
      },
      {
        it: 'normal',
        props: {
          size: 'normal',
        },
      },
      {
        it: 'large',
        props: {
          size: 'large',
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`Input${describe ? '/' + describe : ''}`, module).add(it, () => (
      <Input {...defaultProps} {...props} />
    ));
  });
});

storiesOf('Input', module).add('All inputs', () => {
  return (
    <div>
      <AllInputs />
      <AllInputs rtl />
    </div>
  );
});

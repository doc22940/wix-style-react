import React from 'react';
import { storiesOf } from '@storybook/react';
import Tag from '../Tag';
import Box from '../../Box';

const commonProps = {
  children: 'tag',
};

const tests = [
  {
    describe: 'theme',
    its: [
      {
        it: 'error',
        props: {
          theme: 'error',
        },
      },
      {
        it: 'warning',
        props: {
          theme: 'warning',
        },
      },
      {
        it: 'dark',
        props: {
          theme: 'dark',
        },
      },
      {
        it: 'neutral',
        props: {
          theme: 'neutral',
        },
      },
      {
        it: 'light',
        props: {
          theme: 'light',
        },
      },
    ],
  },
  {
    describe: 'removable',
    its: [
      {
        it: 'removable',
        props: {},
      },
      {
        it: 'non-removable',
        props: {
          removable: false,
        },
      },
    ],
  },
  {
    describe: 'States',
    its: [
      {
        it: 'disabled',
        props: {
          disabled: true,
        },
      },
    ],
  },
  {
    describe: 'Thumb',
    its: [
      {
        it: 'Thumb',
        props: {
          thumb: (
            <div
              style={{
                backgroundColor: 'green',
                height: '100%',
                width: '100%',
              }}
            />
          ),
        },
      },
    ],
  },
  {
    describe: 'ellipsis',
    its: [
      {
        it: 'with max width prop',
        props: {
          maxWidth: 145,
          children: 'I have a max width prop',
        },
      },
      {
        it: 'long text',
        props: {
          children:
            'This is a very long text that is going to break in the middle with an ellipsis',
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props, container }) => {
    storiesOf(`Tag${describe ? '/' + describe : ''}`, module).add(it, () => (
      <Box direction={'vertical'}>
        {['tiny', 'small', 'medium', 'large'].map(size => (
          <Box margin={1} width="330px" {...container}>
            <Tag {...commonProps} {...props} size={size} />
          </Box>
        ))}
      </Box>
    ));
  });
});

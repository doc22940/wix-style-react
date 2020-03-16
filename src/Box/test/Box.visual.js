import React from 'react';
import { storiesOf } from '@storybook/react';

import Box from '..';

const simpleChild = <span>Here is a simple text</span>;

const multipleBoxes = [
  <Box
    align="center"
    verticalAlign="middle"
    margin={'1px'}
    width={'80px'}
    height={'80px'}
    color="D70"
    backgroundColor="B10"
    borderRadius={'3px'}
    key={1}
  >
    Blue
  </Box>,
  <Box
    align="center"
    verticalAlign="middle"
    margin={'1px'}
    width={'80px'}
    height={'80px'}
    color="D70"
    backgroundColor="R10"
    borderRadius={'3px'}
    key={2}
  >
    Red
  </Box>,
  <Box
    align="center"
    verticalAlign="middle"
    margin={'1px'}
    width={80}
    height={80}
    color="D70"
    backgroundColor="G10"
    borderRadius={'3px'}
    key={3}
  >
    Green
  </Box>,
];

const baseProps = {
  inline: false,
  direction: 'horizontal',
  align: 'center',
  verticalAlign: 'middle',
  padding: '1',
  minHeight: '200px',
  color: 'P00',
  backgroundColor: 'B50',
  children: simpleChild,
};

const tests = [
  {
    describe: 'Basic',
    its: [
      {
        it: 'Should render with text',
        props: {
          ...baseProps,
        },
      },
      {
        it: 'Should render with text as inline element',
        props: {
          ...baseProps,
          inline: true,
        },
      },
    ],
  },
  {
    describe: 'Alignment',
    its: [
      {
        it: 'Should be aligned horizontally to right',
        props: {
          ...baseProps,
          align: 'right',
        },
      },
      {
        it: 'Should be aligned vertically to bottom',
        props: {
          ...baseProps,
          verticalAlign: 'bottom',
        },
      },
    ],
  },
  {
    describe: 'Spacing',
    its: [
      {
        it: 'Should be rendered with margin',
        props: {
          ...baseProps,
          margin: '2px',
        },
      },
      {
        it: 'Should be rendered with padding',
        props: {
          ...baseProps,
          padding: '3px 4px',
        },
      },
    ],
  },
  {
    describe: 'Sizing',
    its: [
      {
        it: 'Should be rendered with minHeight',
        props: {
          ...baseProps,
          minHeight: '50px',
        },
      },
      {
        it: 'Should be rendered with maxWidth',
        props: {
          ...baseProps,
          maxWidth: 100,
        },
      },
    ],
  },
  {
    describe: 'Styling',
    its: [
      {
        it: 'Should be rendered with color',
        props: {
          ...baseProps,
          color: 'G00',
        },
      },
      {
        it: 'Should be rendered with backgroundColor',
        props: {
          ...baseProps,
          backgroundColor: '#3899ec',
        },
      },
      {
        it:
          'Should be rendered with blue border color on the top, green color on the right, red color on the bottom and gray color on the left',
        props: {
          ...baseProps,
          border: '1px solid #2b81cb',
          borderRightColor: 'G00',
          borderBottomColor: '#d6453d',
          borderLeftColor: 'D50',
        },
      },
    ],
  },
  {
    describe: 'Multiple Boxes',
    its: [
      {
        it: 'Should render a box that contains multiple boxes',
        props: {
          ...baseProps,
          children: multipleBoxes,
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`Box${describe ? '/' + describe : ''}`, module).add(it, () => (
      <Box {...props} />
    ));
  });
});

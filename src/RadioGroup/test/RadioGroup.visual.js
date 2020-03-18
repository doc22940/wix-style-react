import React from 'react';
import { storiesOf } from '@storybook/react';
import RadioGroup from '../RadioGroup';
import Box from '../../Box';

const defaultProps = {
  value: 2,
  onChange: e => e.stopPropagation(),
};

const tests = [
  {
    describe: '',
    its: [
      {
        it: 'basic',
        props: {},
      },
      {
        it: 'all disabled',
        props: {
          disabled: true,
        },
      },
      {
        it: 'some disabled',
        props: {
          disabledRadios: [1, 2],
        },
      },
      {
        it: 'spacing prop',
        props: {
          spacing: '20px',
        },
      },
      {
        it: 'horizontal display',
        props: {
          display: 'horizontal',
        },
      },
      {
        it: 'selectionArea',
        props: { selectionArea: 'always' },
      },
      {
        it: 'selectionArea disabled',
        props: { selectionArea: 'always', disabled: true },
      },
      {
        it: 'selectionArea horizontal',
        props: {
          selectionArea: 'always',
          display: 'horizontal',
        },
      },
    ],
  },
  {
    describe: 'vertical align',
    its: [
      {
        it: 'center vAlign',
        props: {
          vAlign: 'center',
          children: (
            <div>
              <div>This is a radio button</div>
              <div>with more than one line</div>
              <div>and just one more</div>
            </div>
          ),
        },
      },
      {
        it: 'top vAlign',
        props: {
          vAlign: 'top',
          children: (
            <div>
              <div>This is a radio button</div>
              <div>with more than one line</div>
              <div>and just one more</div>
            </div>
          ),
        },
      },
    ],
  },
  {
    describe: 'with content',
    its: [
      {
        it: 'in 2 and 3 radios',
        radioButtonProps: {
          '2': {
            content: '2nd content',
          },
          '3': {
            content: '3rd content',
          },
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props, radioButtonProps = {} }) => {
    storiesOf(`RadioGroup${describe ? '/' + describe : ''}`, module).add(
      it,
      () => (
        <Box direction="vertical">
          <RadioGroup {...defaultProps} {...props}>
            {[1, 2, 3, 4].map(index => (
              <RadioGroup.Radio value={index} {...radioButtonProps[`${index}`]}>
                {props.children || `Option ${index}`}
              </RadioGroup.Radio>
            ))}
          </RadioGroup>
        </Box>
      ),
    );
  });
});

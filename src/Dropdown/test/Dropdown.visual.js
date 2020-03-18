/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react';
import TextButton from '../../TextButton';
import Button from '../../Button';
import Dropdown from '../index';
import { Layout, Cell } from '../../Layout';
import { dropdownTestkitFactory } from '../../../testkit';

const interactiveDataHook = 'interactive-dropdown';

const createDriver = dataHook =>
  dropdownTestkitFactory({
    wrapper: document.body,
    dataHook,
  });

class InteractiveEyeTest extends React.Component {
  async componentDidMount() {
    this.props.componentDidMount();
  }
  render() {
    return (
      <Layout>
        <Cell>
          <Dropdown dataHook={interactiveDataHook} {...this.props} />
        </Cell>
      </Layout>
    );
  }
}

const interactiveTests = [
  {
    describe: 'Examples',
    its: [
      {
        it: 'simple',
        componentDidMount: async () => {
          const { driver } = createDriver(interactiveDataHook);
          await driver.pressKey('ArrowDown');
        },
        props: {
          options: [
            { id: 0, value: 'Left' },
            { id: 1, value: 'Right' },
            { id: 2, value: 'Ambidextrous' },
          ],
        },
      },
      {
        it: 'group',
        componentDidMount: async () => {
          const { driver } = createDriver(interactiveDataHook);
          await driver.pressKey('ArrowDown');
        },
        props: {
          options: [
            { id: 'first title', value: 'title #1', title: true },
            { id: 1, value: 'Option 1' },
            { id: 'title', value: 'title #2', title: true },
            { id: 2, value: 'Option 2' },
            { id: 4, value: 'Option 3' },
          ],
        },
      },
      {
        it: 'divider',
        componentDidMount: async () => {
          const { driver } = createDriver(interactiveDataHook);
          await driver.pressKey('ArrowDown');
        },
        props: {
          options: [
            { id: 0, value: 'Left' },
            { id: 1, value: 'Right' },
            { id: -99, value: '-' },
            { id: 2, value: 'Ambidextrous' },
          ],
        },
      },
      {
        it: 'footer',
        componentDidMount: async () => {
          const { driver } = createDriver(interactiveDataHook);
          await driver.pressKey('ArrowDown');
        },
        props: {
          fixedFooter: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '15px 24px',
                alignItems: 'center',
              }}
            >
              <TextButton skin="dark" underline="always">
                Clear
              </TextButton>
              <Button>Apply</Button>
            </div>
          ),
          options: [
            { id: 0, value: 'Left' },
            { id: 1, value: 'Right' },
            { id: 2, value: 'Ambidextrous' },
          ],
        },
      },
      {
        it: 'header',
        componentDidMount: async () => {
          const { driver } = createDriver(interactiveDataHook);
          await driver.pressKey('ArrowDown');
        },
        props: {
          fixedHeader: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '15px 24px',
                alignItems: 'center',
              }}
            >
              <TextButton skin="dark" underline="always">
                Clear
              </TextButton>
              <Button>Apply</Button>
            </div>
          ),
          options: [
            { id: 0, value: 'Left' },
            { id: 1, value: 'Right' },
            { id: 2, value: 'Ambidextrous' },
          ],
        },
      },
      {
        it: 'error',
        componentDidMount: async () => {
          const { driver } = createDriver(interactiveDataHook);
          await driver.pressKey('ArrowDown');
        },
        props: {
          status: 'error',
          options: [
            { id: 0, value: 'Left' },
            { id: 1, value: 'Right' },
            { id: 2, value: 'Ambidextrous' },
          ],
        },
      },
      {
        it: 'disabled',
        componentDidMount: async () => {
          const { driver } = createDriver(interactiveDataHook);
          await driver.pressKey('ArrowDown');
        },
        props: {
          disabled: true,
          options: [
            { id: 0, value: 'Left' },
            { id: 1, value: 'Right' },
            { id: 2, value: 'Ambidextrous' },
          ],
        },
      },
    ],
  },
];

interactiveTests.forEach(({ describe, its }) => {
  its.forEach(({ it, props, componentDidMount }) => {
    storiesOf(`Dropdown${describe ? '/' + describe : ''}`, module).add(
      it,
      () => (
        <InteractiveEyeTest {...props} componentDidMount={componentDidMount} />
      ),
    );
  });
});

/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react';

import AutoComplete from '../index';
import { Layout, Cell } from '../../Layout';
import { dropdownTestkitFactory } from '../../../testkit';

const interactiveDataHook = 'interactive-dropdown';

const createDriver = dataHook =>
  dropdownTestkitFactory({
    wrapper: document.body,
    dataHook,
  });

class InteractiveEyeTest extends React.Component {
  state = { value: ' ' };

  onSelect = option => {
    this.setState({ value: option.value });
  };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  async componentDidMount() {
    this.props.componentDidMount();
  }
  render() {
    const { value } = this.state;

    return (
      <Layout>
        <Cell>
          <AutoComplete
            dataHook={interactiveDataHook}
            value={value}
            onChange={this.onChange}
            onSelect={this.onSelect}
            placeholder={'Start typing'}
            predicate={option =>
              option.value.toLowerCase().indexOf(value.toLowerCase()) !== -1
            }
            {...this.props}
          />
        </Cell>
      </Layout>
    );
  }
}

const interactiveTests = [
  {
    describe: 'Usage',
    its: [
      {
        it: 'simple',
        componentDidMount: async () => {
          const { driver } = createDriver(interactiveDataHook);
          await driver.pressKey('ArrowDown');
        },
        props: {
          options: [
            { id: 0, value: 'First option' },
            { id: 1, value: 'Second option' },
            { id: 2, value: 'Third option' },
            { id: 3, value: 'Fifth option' },
            { id: 4, value: 'Fourth option' },
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
            { id: 0, value: 'First option' },
            { id: 1, value: 'Second option' },
            { id: 2, value: 'Third option' },
            { id: 3, value: 'Fifth option' },
            { id: 4, value: 'Fourth option' },
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
            { id: 0, value: 'First option' },
            { id: 1, value: 'Second option' },
            { id: 2, value: 'Third option' },
            { id: 3, value: 'Fifth option' },
            { id: 4, value: 'Fourth option' },
          ],
        },
      },
    ],
  },
];

interactiveTests.forEach(({ describe, its }) => {
  its.forEach(({ it, props, componentDidMount }) => {
    storiesOf(`AutoComplete${describe ? '/' + describe : ''}`, module).add(
      it,
      () => (
        <InteractiveEyeTest {...props} componentDidMount={componentDidMount} />
      ),
    );
  });
});

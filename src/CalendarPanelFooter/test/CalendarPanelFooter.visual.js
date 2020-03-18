import React from 'react';
import { storiesOf } from '@storybook/react';
import { storySettings } from '../docs/storySettings';
import CalendarPanelFooter, { defaultDateToStringOptions } from '../index';

const tests = [
  {
    describe: 'CalendarPanelFooter',
    its: [
      {
        it: 'should render',
        props: {
          dataHook: storySettings.dataHook,
          primaryActionDisabled: false,
          primaryActionOnClick: () => null,
          secondaryActionOnClick: () => null,
          dateToString: date =>
            date.toLocaleDateString('en-US', defaultDateToStringOptions),
          selectedDays: {
            from: new Date('2019-05-27T21:00:00.000Z'),
            to: new Date('2019-05-27T21:00:00.000Z'),
          },
          primaryActionLabel: 'submit',
          secondaryActionLabel: 'cancel',
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(
      `CalendarPanelFooter${describe ? '/' + describe : ''}`,
      module,
    ).add(it, () => <CalendarPanelFooter {...props} />);
  });
});

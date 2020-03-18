import React from 'react';
import { storiesOf } from '@storybook/react';

import CalendarPanel from '../CalendarPanel';

const tests = [
  {
    describe: 'CalendarPanel',
    its: [
      {
        it: 'no presets',
        props: {
          presets: [],
          value: new Date(1990, 3, 29),
          footer: false,
        },
      },
      {
        it: 'with presets',
        props: {
          presets: [
            { id: 1, value: 'a day', selectedDays: new Date(2018, 1, 1) },
            {
              id: 2,
              value: 'a range',
              selectedDays: {
                from: new Date(2018, 1, 1),
                to: new Date(2018, 2, 1),
              },
            },
          ],
          value: new Date(1990, 3, 29),
          footer: false,
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`CalendarPanel${describe ? '/' + describe : ''}`, module).add(
      it,
      () => <CalendarPanel {...props} />,
    );
  });
});

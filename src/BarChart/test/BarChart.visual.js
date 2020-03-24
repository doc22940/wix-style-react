import React from 'react';
import { storiesOf } from '@storybook/react';
import BarChart from '../BarChart';

const tests = [
  {
    describe: 'sanity',
    its: [
      {
        it: 'many items',
        props: {
          items: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => ({
            value: 250,
            description: `Option ${n}`,
          })),
        },
      },
      {
        it: '3 items',
        props: {
          items: [
            {
              value: 75000,
              description: 'Facebook',
            },
            {
              value: 175000,
              description: 'Instagram',
            },
            {
              value: 40000,
              description: 'Pinterest',
            },
          ],
        },
      },
      {
        it: 'label',
        props: {
          items: [
            {
              value: 75000,
              label: '$75,000',
              description: 'Facebook',
            },
            {
              value: 175000,
              label: '$175,000',
              description: 'Instagram',
            },
            {
              value: 40000,
              label: '$40,000',
              description: 'Pinterest',
            },
          ],
        },
      },
    ],
  },
  {
    describe: 'total',
    its: [
      {
        it: '2 item',
        props: {
          total: 1200,
          items: [
            {
              value: 250,
              description: 'Desktop',
              descriptionInfo: '250 of 1200 users visiting site from a desktop',
            },
            {
              value: 480,
              description: 'Mobile',
              descriptionInfo: '250 of 1200 users visiting site from mobile',
            },
          ],
        },
      },
      {
        it: '1 item',
        props: {
          total: 1200,
          items: [
            {
              value: 1000,
              description: 'Desktop',
              descriptionInfo: '250 of 1200 users visiting site from a desktop',
            },
          ],
        },
      },
    ],
  },
  {
    describe: 'displayed value',
    its: [
      {
        it: 'label',
        props: {
          items: [
            {
              value: 25000,
              label: '$25,000',
              description: 'Sales',
            },
            {
              value: 48000,
              label: '$48,000',
              description: 'Subscription',
            },
            {
              value: 42000,
              label: '$42,000',
              description: 'Ads',
            },
          ],
        },
      },
      {
        it: 'short label',
        props: {
          items: [
            {
              value: 25000000,
              label: '$25,000,000',
              description: 'Sales',
            },
            {
              value: 20000000,
              label: '$20,000,000',
              labelShort: '$20M',
              description: 'Subscription',
            },
            {
              value: 42000000,
              label: '$42,000,000',
              labelShort: '$42M',
              description: 'Ads',
            },
            {
              value: 78000000,
              label: '$78,000,000',
              labelShort: '$78M',
              description: 'Other',
            },
          ],
        },
      },
      {
        it: 'short label with descriptionInfo',
        props: {
          items: [
            {
              value: 25000000,
              label: '$25,000,000',
              description: 'Sales',
              descriptionInfo: 'descriptionInfo',
            },
            {
              value: 20000000,
              label: '$20,000,000',
              labelShort: '$20M',
              description: 'Subscription',
              descriptionInfo: 'descriptionInfo',
            },
            {
              value: 5000000,
              label: '$5,000,000',
              labelShort: '$5M',
              description: 'Donations',
              descriptionInfo: 'descriptionInfo',
            },
            {
              value: 42000000,
              label: '$42,000,000',
              labelShort: '$42M',
              description: 'Ads',
              descriptionInfo: 'descriptionInfo',
            },
            {
              value: 78000000,
              label: '$78,000,000',
              labelShort: '$78M',
              description: 'Other',
              descriptionInfo: 'descriptionInfo',
            },
          ],
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`BarChart${describe ? '/' + describe : ''}`, module).add(
      it,
      () => (
        <div style={{ width: '800px' }}>
          <BarChart {...props} />
        </div>
      ),
    );
  });
});

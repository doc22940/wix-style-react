/* eslint-disable no-undef */ /* eslint-disable no-console */
import React from 'react';
import StatisticsWidget from 'wix-style-react/StatisticsWidget';
import Card from 'wix-style-react/Card';

render(
  <Card>
    <Card.Header title={'Article performance'} />
    <Card.Divider />
    <Card.Content>
      <StatisticsWidget
        items={[
          {
            value: '500',
            description: 'Views',
            percentage: 21,
            onClick: () => {},
          },
          {
            value: '350',
            description: 'Uniq visits',
            percentage: 21,
            invertedPercentage: true,
          },
          {
            value: '3.9',
            description: 'Pages per visitor',
            percentage: -11,
          },
          {
            value: '$3,500',
            description: 'Revenue',
            percentage: -11,
            invertedPercentage: true,
            descriptionInfo: 'Sales on Thursday',
            onClick: () => {},
          },
          {
            value: '0',
            description: 'Shares',
            percentage: 0,
            invertedPercentage: true,
            descriptionInfo: 'Clicks on Friday',
            onClick: () => {},
          },
        ]}
      />
    </Card.Content>
  </Card>,
);

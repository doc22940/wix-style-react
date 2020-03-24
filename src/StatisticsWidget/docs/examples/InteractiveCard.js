/* eslint-disable no-undef */
import React from 'react';
import StatisticsWidget from 'wix-style-react/StatisticsWidget';
import Card from 'wix-style-react/Card';
import DropdownBase from 'wix-style-react/DropdownBase';
import Icons from 'wix-style-react/Icons';
import TextButton from 'wix-style-react/TextButton';

class StatsWrapper extends React.Component {
  constructor() {
    super();

    this.state = { date: '7d', filter: 'All' };
  }

  _getSuffix() {
    return [
      <DropdownBase
        onSelect={({ id }) => this.setState({ date: id })}
        options={[
          { id: '7d', value: 'Last 7 days' },
          { id: '14d', value: 'Last 14 days' },
        ]}
      >
        {({ toggle, selectedOption = { id: '7d', value: 'Last 7 days' } }) => {
          return (
            <TextButton
              skin="dark"
              suffixIcon={<Icons.ChevronDown />}
              onClick={toggle}
            >
              {selectedOption.value}
            </TextButton>
          );
        }}
      </DropdownBase>,
      <DropdownBase
        onSelect={({ id }) => this.setState({ filter: id })}
        options={[
          { id: 'US', value: 'Only from US' },
          { id: 'All', value: 'All' },
        ]}
      >
        {({ toggle, selectedOption = { id: 'All', value: 'All' } }) => {
          return (
            <TextButton
              skin="dark"
              suffixIcon={<Icons.ChevronDown />}
              onClick={toggle}
            >
              {selectedOption.value}
            </TextButton>
          );
        }}
      </DropdownBase>,
    ];
  }

  render() {
    const { date, filter } = this.state;
    return (
      <Card>
        <Card.Header title={'Article performance'} suffix={this._getSuffix()} />
        <Card.Divider />
        <Card.Content>
          <StatisticsWidget items={getData(date, filter)} />
        </Card.Content>
      </Card>
    );
  }
}

render(<StatsWrapper />);

const weekUS = [
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
    descriptionInfo: 'Revenue in 7 days',
    onClick: () => {},
  },
  {
    value: '0',
    description: 'Shares',
    percentage: 0,
    descriptionInfo: 'Shares in 7 days',
    onClick: () => {},
  },
];

const twoWeeksUS = [
  {
    value: '700',
    description: 'Views',
    percentage: 19,
    onClick: () => {},
  },
  {
    value: '500',
    description: 'Uniq visits',
    percentage: 21,
  },
  {
    value: '3.2',
    description: 'Pages per visitor',
    percentage: -11,
  },
  {
    value: '$5,700',
    description: 'Revenue',
    percentage: -11,
    descriptionInfo: 'Revenue in 14 days',
    onClick: () => {},
  },
  {
    value: '0',
    description: 'Shares',
    percentage: 0,
    descriptionInfo: 'Shares in 14 days',
    onClick: () => () => {},
  },
];

const weekAll = [
  {
    value: '1200',
    description: 'Views',
    percentage: 21,
    onClick: () => {},
  },
  {
    value: '900',
    description: 'Uniq visits',
    percentage: 21,
  },
  {
    value: '4.1',
    description: 'Pages per visitor',
    percentage: 2,
  },
  {
    value: '$5,200',
    description: 'Revenue',
    percentage: 7,
    descriptionInfo: 'Revenue in 7 days',
    onClick: () => {},
  },
  {
    value: '3',
    description: 'Shares',
    percentage: 100,
    descriptionInfo: 'Shares in 7 days',
    onClick: () => {},
  },
];

const twoWeeksAll = [
  {
    value: '1300',
    description: 'Views',
    percentage: 29,
    onClick: () => {},
  },
  {
    value: '1100',
    description: 'Uniq visits',
    percentage: 14,
  },
  {
    value: '3.2',
    description: 'Pages per visitor',
    percentage: -1,
  },
  {
    value: '$6,400',
    description: 'Revenue',
    percentage: 11,
    descriptionInfo: 'Revenue in 14 days',
    onClick: () => {},
  },
  {
    value: '8',
    description: 'Shares',
    percentage: 95,
    descriptionInfo: 'Shares in 14 days',
    onClick: () => {},
  },
];

const data = {
  '7d': {
    US: weekUS,
    All: weekAll,
  },
  '14d': {
    US: twoWeeksUS,
    All: twoWeeksAll,
  },
};

const getData = (date, filter) => data[date][filter];

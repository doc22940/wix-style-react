import * as React from 'react';
import Calendar from '..';
import { calendarTestkitFactory } from '../../../testkit';
import { calendarTestkitFactory as CalendarEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { mount } from 'enzyme';

function testkits() {
  const vanilla = calendarTestkitFactory({
    dataHook: 'hi',
    wrapper: document.createElement('div'),
  });

  vanilla.exists();

  const enzyme = CalendarEnzymeTestkitFactory({
    dataHook: 'shbem',
    wrapper: mount(<div />),
  });
}

function CalendarWithMandatoryProps() {
  return <Calendar onChange={() => {}} />;
}

function CalendarWithAllProps() {
  return (
    <Calendar
      autoFocus={false}
      numOfMonths={1}
      className="className"
      onChange={() => {}}
      onClose={() => {}}
      excludePastDates={false}
      filterDate={() => {}}
      value=""
      selectionMode="day"
      showYearDropdown
      showMonthDropdown
      shouldCloseOnSelect
      locale="en"
    />
  );
}

function invokeStaticMethods() {
  Calendar.areValuesEqual();
  Calendar.areValuesEqual({});
  Calendar.areValuesEqual({}, {});

  Calendar.renderDay(1, []);
  Calendar.optionalParse('12/12/2019');
  Calendar.parseValue('10/10/2020');

  const myDate: Date = Calendar.isSingleDay(4);
  const range: boolean = Calendar.isRangeValue(3);
  const month: any = Calendar.getUpdatedMonth({}, 3, {});
}

import * as React from 'react';
import {mount} from 'enzyme';

import TimeTable from '..';
import {timeTableTestkitFactory} from '../../../testkit';
import {timeTableTestkitFactory as timeTableEnzymeTestkitFactory} from '../../../testkit/enzyme';

async function testkits() {
  const vanilla = timeTableTestkitFactory({
    dataHook: 'test',
    wrapper: document.createElement('div')
  });

  let number: number;
  let string: string;
  let boolean: boolean;

  await vanilla.exists();
  await vanilla.element();
  await vanilla.click();
  number = await vanilla.getColumnCount();
  string = await vanilla.getTitleAt(0);
  string = await vanilla.getSubtitleAt(0);
  boolean = await vanilla.isColumnActiveAt(0);
  boolean = await vanilla.isColumnDisabledAt(0);
  boolean = await vanilla.isColumnDroppableAt(0);
  number = await vanilla.getItemCountAt(0);
  boolean = await vanilla.isItemDisabledAt(0, 0);
  boolean = await vanilla.isItemDraggableAt(0, 0);
  await vanilla.clickOnAddItemButtonAt(0);
  boolean = await vanilla.addItemButtonExistsAt(0);

  const enzyme = timeTableEnzymeTestkitFactory({
    dataHook: 'test',
    wrapper: mount(<div />)
  });

  await enzyme.exists();
  await enzyme.element();
  await enzyme.click();
  number = await enzyme.getColumnCount();
  string = await enzyme.getTitleAt(0);
  string = await enzyme.getSubtitleAt(0);
  boolean = await enzyme.isColumnActiveAt(0);
  boolean = await enzyme.isColumnDisabledAt(0);
  boolean = await enzyme.isColumnDroppableAt(0);
  number = await enzyme.getItemCountAt(0);
  boolean = await enzyme.isItemDisabledAt(0, 0);
  boolean = await enzyme.isItemDraggableAt(0, 0);
  await enzyme.clickOnAddItemButtonAt(0);
  boolean = await enzyme.addItemButtonExistsAt(0);
}

function TimeTableWithMandatoryProps() {
  return <TimeTable />;
}

function TimeTableWithAllProps() {
  return (
    <TimeTable
      dataHook="dataHook"
      insertPosition="any"
      addItemButtonLabel="add item"
      height={150}
      columns={[
        {
          title: 'title',
          subtitle: 'subtitle',
          disabled: true,
          droppable: true,
          active: true,
          items: [
            {
              content: 'test 1',
              disabled: true,
              draggable: true,
            },
            {
              content: <div />,
            },
            {
              content: ({ Item, disabled, draggable }) =>
                <Item disabled={disabled} draggable={draggable} />,
            }
          ],
        },
        {
          title: 'title',
          subtitle: 'subtitle',
          items: [],
        }
      ]}
      onAdd={columns => undefined}
      onChange={(
        columns,
        { addedToColumnIndex, removedFromColumnIndex, addedItemIndex, removedItemIndex }
      ) => undefined}
    />
  );
}

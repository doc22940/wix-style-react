import { badgeSelectItemBuilder } from '..';

function badgeSelectItemBuilderWithAllProps() {
  const {id, value} = badgeSelectItemBuilder({ id: '1', skin: 'danger', text: 'text' });
}

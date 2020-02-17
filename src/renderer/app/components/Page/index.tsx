import React from 'react';
import { observer } from 'mobx-react-lite';

import { Selectable } from '~/renderer/components/Selection';
import { Area, Item as StyledItem } from './style';

interface IItem {
  label: string;
}

const Item = React.forwardRef(
  (props: { data: IItem; selected: boolean }, ref) => {
    return (
      <StyledItem
        ref={ref}
        style={{
          color: props.selected ? '#fff' : '#000',
        }}
      >
        {props.data.label}
      </StyledItem>
    );
  },
);

export const Page = observer(() => {
  const [items, setItems] = React.useState<IItem[]>([
    { label: 'First' },
    { label: 'Second' },
    { label: 'Third' },
  ]);

  const [selected, setSelected] = React.useState<string[]>([]);

  const onSelect = (data: IItem[]) => {
    const selected = data.map(r => r.label);

    setSelected(selected);
  };

  return (
    <Area onSelect={onSelect}>
      {items.map(r => (
        <Selectable key={r.label} data={r}>
          {innerRef => (
            <Item
              data={r}
              ref={innerRef}
              selected={selected.indexOf(r.label) !== -1}
            />
          )}
        </Selectable>
      ))}
    </Area>
  );
});

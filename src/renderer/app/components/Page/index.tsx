import React from 'react';
import { observer } from 'mobx-react-lite';

import { Selectable } from '~/renderer/components/Selection';
import { Area, Item } from './style';

export const Page = observer(() => {
  return (
    <Area>
      <Selectable>
        {provided => (
          <Item ref={provided.innerRef}>
            <div>item</div>
          </Item>
        )}
      </Selectable>
    </Area>
  );
});

import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { StyledPathView, Container, Item } from './style';

const onItemClick = (index: number) => () => {
  const page = store.pages.current;
  page.path.goto(index);
}

export const PathView = observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  return (
    <StyledPathView>
      <Container visible>
        {page.path.items.map((label, index) => (
          <Item key={label} onClick={onItemClick(index)}>{label}</Item>
        ))}
      </Container>
    </StyledPathView>
  );
});

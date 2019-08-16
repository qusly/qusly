import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { StyledPathView, Container, Item } from './style';

export const PathView = observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  return (
    <StyledPathView>
      <Container visible>
        {page.path.items.map((label, index) => (
          <Item key={index}>{label}</Item>
        ))}
      </Container>
    </StyledPathView>
  );
});

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
        <Item>/</Item>
        <Item>Home</Item>
        <Item>Documents</Item>
        <Item>Projects</Item>
        <Item>Qusly</Item>
      </Container>
    </StyledPathView>
  );
});

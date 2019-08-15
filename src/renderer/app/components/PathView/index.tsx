import * as React from 'react';

import { StyledPathView, Container, Item } from './style';

export const PathView = () => {
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
}

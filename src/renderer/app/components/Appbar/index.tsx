import React from 'react';

import { Tabbar } from '../Tabbar';
import { Toolbar } from '../Toolbar';
import { PathView } from '../PathView';
import { StyledAppbar, Container } from './style';

export const Appbar = () => {
  return (
    <StyledAppbar>
      <Tabbar />
      <Container>
        <PathView />
        <Toolbar />
      </Container>
    </StyledAppbar>
  );
};

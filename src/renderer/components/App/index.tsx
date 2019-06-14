import * as React from 'react';
import { GlobalStyle } from 'wexond-ui';

import AppBar from '../AppBar';
import Menu from '../Menu';
import Page from '../Page';
import { StyledApp, AppContent } from './styles';

export default () => {
  return (
    <StyledApp>
      <GlobalStyle />
      <Menu />
      <AppContent>
        <AppBar />
        <Page />
      </AppContent>
    </StyledApp>
  );
};

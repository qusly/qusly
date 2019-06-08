import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import AppBar from '../AppBar';
import { Style } from '~/renderer/styles';
import Menu from '../Menu';
import Content from '../Content';
import Overlay from '../Overlay';
import { StyledApp, AppContent } from './styles';

const GlobalStyle = createGlobalStyle`${Style}`;

export default () => {
  return (
    <StyledApp>
      <GlobalStyle />
      <Menu />
      <AppContent>
        <AppBar />
        <Content />
      </AppContent>
      <Overlay />
    </StyledApp>
  );
};

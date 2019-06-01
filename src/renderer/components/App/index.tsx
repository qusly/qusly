import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import AppBar from '../AppBar';
import { Style } from '~/renderer/styles';
import ActivityBar from '../ActivityBar';
import Menu from '../Menu';
import { StyledApp, AppContent } from './styles';
import Content from '../Content';

const GlobalStyle = createGlobalStyle`${Style}`;

export default () => {
  return (
    <StyledApp>
      <GlobalStyle />
      <ActivityBar />
      <Menu />
      <AppContent>
        <AppBar />
        <Content />
      </AppContent>
    </StyledApp>
  );
};

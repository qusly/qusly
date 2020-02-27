import { hot } from 'react-hot-loader/root';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Sidebar } from '../Sidebar';
import { ContextMenu } from '../ContextMenu';
import { Titlebar } from '../Titlebar';
import { ContentView } from '../ContentView';
import { Activitybar } from '../Activitybar';
import { Style } from '../../style';
import { StyledApp, Container } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Titlebar />
        <Container>
          <Activitybar />
          <Sidebar />
          <ContentView />
        </Container>
        <ContextMenu />
      </StyledApp>
    </>
  );
};

export default hot(App);

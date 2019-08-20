import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { createGlobalStyle } from 'styled-components';

import { Titlebar } from '../Titlebar';
import { Activitybar } from '../Activitybar';
import { Sidebar } from '../Sidebar';
import { Content } from '../Content';
import { ContextMenu } from '../ContextMenu';
import { Style } from '../../style';
import { StyledApp, Container } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const App = () => {
  return (
    <StyledApp>
      <GlobalStyle />
      <Titlebar />
      <Container>
        <Activitybar />
        <Sidebar />
        <Content />
      </Container>
      <ContextMenu />
    </StyledApp>
  );
};

export default hot(App);

import { hot } from 'react-hot-loader/root';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Page } from '../Page';
import { Appbar } from '../Appbar';
import { ContextMenu } from '../ContextMenu';
import { Style } from '../../style';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Appbar />
        <Page />
        <ContextMenu />
      </StyledApp>
    </>
  );
};

export default hot(App);

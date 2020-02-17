import { hot } from 'react-hot-loader/root';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Tabbar } from '../Tabbar';
import { Page } from '../Page';
import { Style } from '../../style';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        {/* <Tabbar /> */}
        <Page />
      </StyledApp>
    </>
  );
};

export default hot(App);

import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Tabbar } from '../Tabbar';
import { Style } from '../../style';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Tabbar />
      </StyledApp>
    </>
  );
};

export default hot(App);

import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { createGlobalStyle } from 'styled-components';

import { Titlebar } from '../Titlebar';
import { Activitybar } from '../Activitybar';
import { StyledApp } from './style';
import { Style } from '~/renderer/app/style';

const GlobalStyle = createGlobalStyle`${Style}`;

const App = () => {
  return (
    <StyledApp>
      <GlobalStyle />
      <Titlebar />
      <Activitybar />
    </StyledApp>
  );
};

export default hot(App);

import * as React from 'react';
import { createGlobalStyle } from 'styled-components';

import AppBar from '../AppBar';
import { Style } from '~/renderer/styles';

const GlobalStyle = createGlobalStyle`${Style}`;

export default class App extends React.Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <AppBar />
      </>
    );
  }
}

import * as React from 'react';
import { createGlobalStyle } from 'styled-components';

import { AppBar } from '../AppBar';
import { Menu } from '../Menu';
import { Style } from '~/renderer/styles';
import store from '~/renderer/store';

const GlobalStyle = createGlobalStyle`${Style}`;

export default class App extends React.Component {
  componentDidMount() {
    store.tabsStore.addTab('New tab');
  }

  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <AppBar />
        <Menu />
      </React.Fragment>
    );
  }
}

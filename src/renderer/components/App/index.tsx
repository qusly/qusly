import * as React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Toolbar } from '../Toolbar';
import store from '~/renderer/store';
import { Style } from '~/renderer/styles';

const GlobalStyle = createGlobalStyle`${Style}`;

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <Toolbar />
        <button onClick={() => store.tabsStore.addTab('Tab')}>add</button>
      </React.Fragment>
    );
  }
}

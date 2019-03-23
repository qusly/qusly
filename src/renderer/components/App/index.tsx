import * as React from 'react';
import { createGlobalStyle } from 'styled-components';

import { AppBar } from '../AppBar';
import { Menu } from '../Menu';
import { Style } from '~/renderer/styles';
import BottomNav from '../BottomNav';
import store from '~/renderer/store';
import { BottomNavItem } from '../BottomNavItem';
import { icons } from '~/renderer/constants';
import { ProgressBar } from '../ProgressBar';
import { Header } from '../Header';
import { Folder } from '../Folder';
import { File } from '../File';
import { Content } from '../Content';
import { InfoPanel } from '../InfoPanel';

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
        <InfoPanel />
        <Content />
      </React.Fragment>
    );
  }
}

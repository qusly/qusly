import * as React from 'react';
import { createGlobalStyle } from 'styled-components';

import { AppBar } from '../AppBar';
import { Menu } from '../Menu';
import { Style } from '~/renderer/styles';
import BottomNav from '../BottomNav';
import store from '~/renderer/store';
import { BottomNavItem } from '../BottomNavItem';
import { icons } from '~/renderer/constants';

const GlobalStyle = createGlobalStyle`${Style}`;

export default class App extends React.Component {
  componentDidMount() {
    store.tabsStore.addTab('New tab');
  }

  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <div style={{ width: 512, margin: 64 }}>
          <BottomNav>
            <BottomNavItem icon={icons.download}>Downloaded</BottomNavItem>
            <BottomNavItem icon={icons.upload}>Uploaded</BottomNavItem>
            <BottomNavItem icon={icons.info}>Details</BottomNavItem>
          </BottomNav>
        </div>
      </React.Fragment>
    );
  }
}

/*        <AppBar />
        <Menu />*/

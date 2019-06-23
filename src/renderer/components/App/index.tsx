import * as React from 'react';
import { IProtocol } from 'qusly-core';
import { GlobalStyle } from 'wexond-ui';
import { WindowsControls } from 'react-windows-controls';

import AppBar from '../AppBar';
import Menu from '../Menu';
import Page from '../Page';
import Overlay from '../Overlay';
import store from '~/renderer/store';
import {
  VerticalLayout,
  HorizontalLayout,
  AppContent,
  Titlebar,
} from './styles';
import { closeWindow, maximizeWindow, minimizeWindow } from '~/renderer/utils';

export default class App extends React.Component {
  componentDidMount() {
    const {
      NODE_ENV,
      HOSTNAME,
      USER,
      PASSWORD,
      PROTOCOL,
      PORT,
      ENABLED,
    } = process.env;

    if (NODE_ENV === 'development' && ENABLED) {
      store.tabs.addTab({
        title: HOSTNAME,
        host: HOSTNAME,
        user: USER,
        password: PASSWORD,
        protocol: PROTOCOL.toLowerCase() as IProtocol,
        port: parseInt(PORT, 10),
      });
    }
  }

  render() {
    return (
      <VerticalLayout>
        <GlobalStyle />
        <Titlebar>
          <WindowsControls
            onClose={closeWindow}
            onMaximize={maximizeWindow}
            onMinimize={minimizeWindow}
            style={{ marginLeft: 'auto' }}
          />
        </Titlebar>
        <HorizontalLayout>
          <Menu />
          <AppContent>
            <AppBar />
            <Page />
          </AppContent>
          <Overlay />
        </HorizontalLayout>
      </VerticalLayout>
    );
  }
}

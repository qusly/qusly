import * as React from 'react';
import { IProtocol } from 'qusly-core';
import { GlobalStyle } from 'wexond-ui';
import AppBar from '../AppBar';
import Menu from '../Menu';
import Page from '../Page';
import Overlay from '../Overlay';
import store from '~/renderer/store';
import { VerticalLayout, HorizontalLayout, AppContent } from './styles';
import { Titlebar } from '../Titlebar';

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
        <Titlebar />
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

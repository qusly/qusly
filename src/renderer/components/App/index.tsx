import * as React from 'react';
import { IProtocol } from 'qusly-core';
import { GlobalStyle } from 'wexond-ui';

import store from '~/renderer/store';
import Menu from '../Menu';
import Overlay from '../Overlay';
import { Titlebar } from '../Titlebar';
import Content from '../Content';
import FileMenu from '../FileMenu';
import { VerticalLayout, HorizontalLayout } from './styles';

export default class App extends React.PureComponent {
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
          <Content />
          <Overlay />
          <FileMenu />
        </HorizontalLayout>
      </VerticalLayout>
    );
  }
}

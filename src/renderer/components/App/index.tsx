import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { observer } from 'mobx-react';

import AppBar from '../AppBar';
import { Style } from '~/renderer/styles';
import {
  Container,
  Menu,
  StyledApp,
  AppContent,
  Search,
  Title,
  SearchContainer,
  Menu2,
} from './styles';
import store from '~/renderer/store';
import { Preloader } from '../Preloader';
import FilesView from '../FilesView';
import NavigationButtons from '../NavigationButtons';

const GlobalStyle = createGlobalStyle`${Style}`;

const Content = observer(() => {
  const { status } = store.session;

  return (
    <Container>
      {status === 'loading' && (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Preloader />
        </div>
      )}
      <FilesView />
    </Container>
  );
});

export default class App extends React.Component {
  render() {
    return (
      <StyledApp>
        <GlobalStyle />
        <Menu2 />
        <Menu>
          <Search />
        </Menu>
        <AppContent>
          <AppBar />
          <Content />
        </AppContent>
      </StyledApp>
    );
  }
}

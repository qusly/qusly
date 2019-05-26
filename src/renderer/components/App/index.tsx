import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { observer } from 'mobx-react';

import AppBar from '../AppBar';
import { Style } from '~/renderer/styles';
import store from '~/renderer/store';
import { Preloader } from '../Preloader';
import FilesView from '../FilesView';
import ActivityBar from '../ActivityBar';
import NavDrawer from '../NavDrawer';
import { Container, StyledApp, AppContent } from './styles';

const GlobalStyle = createGlobalStyle`${Style}`;

const Content = observer(() => {
  return (
    <Container>
      {store.session.status === 'loading' && (
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
        <ActivityBar />
        <NavDrawer />
        <AppContent>
          <AppBar />
          <Content />
        </AppContent>
      </StyledApp>
    );
  }
}

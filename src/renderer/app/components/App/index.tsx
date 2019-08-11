import { platform } from 'os';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { createGlobalStyle } from 'styled-components';
import { WindowsControls } from 'react-windows-controls';

import { closeWindow, minimizeWindow, maximizeWindow } from '../../utils';
import { TOOLBAR_HEIGHT } from '../../constants';
import { Style } from '../../style';
import { StyledApp } from './style';

const GlobalStyle = createGlobalStyle`${Style}`;

const App = () => {
  return (
    <StyledApp>
      <GlobalStyle />
      test
      {platform() !== 'darwin' && (
        <WindowsControls
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 9999,
            height: TOOLBAR_HEIGHT,
            WebkitAppRegion: 'no-drag',
          }}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
        />
      )}
    </StyledApp>
  );
};

export default hot(App);

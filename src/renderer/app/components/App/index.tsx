import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { platform } from 'os';
import { WindowsControls } from 'react-windows-controls';

import { closeWindow, minimizeWindow, maximizeWindow } from '../../utils';
import { TOOLBAR_HEIGHT } from '../../constants';
import * as style from './style.scss';

import { Container } from '../Container';

const App = () => {
  return (
    <div className={style.app}>
      test
      <Container />
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
    </div>
  );
};

export default hot(App);

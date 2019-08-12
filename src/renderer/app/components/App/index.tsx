import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { platform } from 'os';
import { WindowsControls } from 'react-windows-controls';

import { closeWindow, minimizeWindow, maximizeWindow } from '../../utils';
import { TOOLBAR_HEIGHT } from '../../constants';
import * as styles from './style.css';

const App = () => {
  return (
    <div className={styles.app}>
      aha
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

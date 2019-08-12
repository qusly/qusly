import * as React from 'react';
import { observer } from 'mobx-react';
import { platform } from 'os';
import { ipcRenderer } from 'electron';
import { WindowsControls } from 'react-windows-controls';

import { closeWindow, maximizeWindow, minimizeWindow } from '~/renderer/app/utils';
import * as style from './style.scss';

const onUpdateClick = () => {
  ipcRenderer.send('update-install');
};

export const Titlebar = observer(() => {
  const isDarwin = platform() === 'darwin';

  return (
    <div className={style.titlebar}>
      <div className={style.handle} />
      {isDarwin ? <div className={style.trafficButtons} /> : <div className={style.icon} />}
      <div className={style.title}>Qusly</div>
      {!isDarwin && (
        <WindowsControls
          onClose={closeWindow}
          onMaximize={maximizeWindow}
          onMinimize={minimizeWindow}
          style={{ WebkitAppRegion: 'no-drag', height: '100%' }}
        />
      )}
    </div>
  );
});

//{tab == null ? 'Qusly' : `${tab.title} - Qusly`}

/*
TODO: Auto-updater
{store.updateInfo.available && (
  <ToolbarButton icon={icons.download} onClick={onUpdateClick} />
)}*/

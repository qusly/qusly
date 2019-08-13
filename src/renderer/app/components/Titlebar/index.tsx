import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { platform } from 'os';
import { ipcRenderer } from 'electron';
import { WindowsControls } from 'react-windows-controls';

import { closeWindow, maximizeWindow, minimizeWindow } from '~/renderer/app/utils';
import { StyledTitlebar, TrafficButtons, Handle, Icon, Title } from './style';

const onUpdateClick = () => {
  ipcRenderer.send('update-install');
};

export const Titlebar = observer(() => {
  const isDarwin = platform() === 'darwin';

  return (
    <StyledTitlebar>
      <Handle />
      {isDarwin ? <TrafficButtons /> : <Icon />}
      <Title>Qusly</Title>
      {!isDarwin && (
        <WindowsControls
          onClose={closeWindow}
          onMaximize={maximizeWindow}
          onMinimize={minimizeWindow}
          style={{ WebkitAppRegion: 'no-drag', height: '100%' }}
        />
      )}
    </StyledTitlebar>
  );
});

//{tab == null ? 'Qusly' : `${tab.title} - Qusly`}

/*
TODO: Auto-updater
{store.updateInfo.available && (
  <ToolbarButton icon={icons.download} onClick={onUpdateClick} />
)}*/

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { platform } from 'os';
import { ipcRenderer } from 'electron';
import { WindowsControls } from 'react-windows-controls';

import store from '~/renderer/app/store';
import { ToolbarButton } from '~/renderer/components/ToolbarButton';
import { icons } from '~/renderer/constants/icons';
import {
  closeWindow,
  maximizeWindow,
  minimizeWindow,
} from '../../utils/window';
import { StyledTitlebar, TrafficButtons, Handle, Title } from './style';

const onUpdateClick = () => {
  ipcRenderer.send('update-install');
};

export const Titlebar = observer(() => {
  const isDarwin = platform() === 'darwin';
  const tab = store.tabs.selectedTab;

  return (
    <StyledTitlebar>
      <Handle />
      {isDarwin && <TrafficButtons />}
      <Title>{!tab ? 'Qusly' : tab.title}</Title>
      {store.updateInfo.available && (
        <ToolbarButton icon={icons.downloadOutline} onClick={onUpdateClick} />
      )}
      {!isDarwin && (
        <WindowsControls
          onClose={closeWindow}
          onMaximize={maximizeWindow}
          onMinimize={minimizeWindow}
          style={{
            WebkitAppRegion: 'no-drag',
            height: '100%',
            marginLeft: 'auto',
          }}
        />
      )}
    </StyledTitlebar>
  );
});

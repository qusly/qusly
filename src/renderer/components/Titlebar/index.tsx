import * as React from 'react';
import { observer } from 'mobx-react';
import { WindowsControls } from 'react-windows-controls';
import { platform } from 'os';

import store from '~/renderer/store';
import { closeWindow, maximizeWindow, minimizeWindow } from '~/renderer/utils';
import { StyledTitlebar, Handle, Title, Icon, TrafficButtons } from './style';

export const Titlebar = observer(() => {
  const tab = store.tabs.selectedTab;

  return (
    <StyledTitlebar>
      <Handle />
      {platform() === 'darwin' ? <TrafficButtons /> : <Icon />}
      <Title>{tab == null ? 'Qusly' : `${tab.title} - Qusly`}</Title>
      {platform() !== 'darwin' && (
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

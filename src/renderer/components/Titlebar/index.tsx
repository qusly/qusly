import * as React from 'react';
import { observer } from 'mobx-react';
import { WindowsControls } from 'react-windows-controls';

import store from '~/renderer/store';
import { closeWindow, maximizeWindow, minimizeWindow } from '~/renderer/utils';
import { StyledTitlebar, Handle, Title } from './style';

export const Titlebar = observer(() => {
  const tab = store.tabs.selectedTab;

  return (
    <StyledTitlebar>
      <Handle />
      <Title>{tab == null ? 'Qusly' : `${tab.title} - Qusly`}</Title>
      <WindowsControls
        onClose={closeWindow}
        onMaximize={maximizeWindow}
        onMinimize={minimizeWindow}
        style={{ WebkitAppRegion: 'no-drag', height: '100%' }}
      />
    </StyledTitlebar>
  );
});

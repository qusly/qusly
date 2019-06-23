import React from 'react';
import { WindowsControls } from 'react-windows-controls';
import { closeWindow, maximizeWindow, minimizeWindow } from '~/renderer/utils';
import { StyledTitlebar, Handle, Title, Icon } from './style';

export const Titlebar = () => {
  return (
    <StyledTitlebar>
      <Handle />
      <Icon />
      <Title>Qusly</Title>
      <WindowsControls
        onClose={closeWindow}
        onMaximize={maximizeWindow}
        onMinimize={minimizeWindow}
        style={{ WebkitAppRegion: 'no-drag', height: '100%' }}
      />
    </StyledTitlebar>
  );
};

import * as React from 'react';

import { icons } from '~/renderer/constants';
import { minimizeWindow, maximizeWindow, closeWindow } from '~/renderer/utils';
import { StyledButton, StyledIcon, StyledWindowButtons } from './style';

interface IButtonProps {
  icon: string;
  isClose?: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const WindowsButton = ({ icon, onClick, isClose }: IButtonProps) => (
  <StyledButton isClose={isClose} icon={icon} onClick={onClick}>
    <StyledIcon isClose={isClose} icon={icon} />
  </StyledButton>
);

export const WindowsButtons = () => {
  return (
    <StyledWindowButtons>
      <WindowsButton icon={icons.windowsMinimize} onClick={minimizeWindow} />
      <WindowsButton icon={icons.windowsMaximize} onClick={maximizeWindow} />
      <WindowsButton icon={icons.windowsClose} onClick={closeWindow} isClose />
    </StyledWindowButtons>
  );
};

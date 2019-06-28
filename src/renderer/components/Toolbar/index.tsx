import * as React from 'react';
import { observer } from 'mobx-react';
import { ipcRenderer } from 'electron';

import NavigationButtons from '../NavigationButtons';
import PathView from '../PathView';
import { StyledToolbar } from './styles';
import ToolbarButton from '../ToolbarButton';
import { icons } from '~/renderer/constants';
import store from '~/renderer/store';

const onUpdateClick = () => {
  ipcRenderer.send('update-install');
};

export default observer(() => {
  return (
    <StyledToolbar>
      <NavigationButtons />
      <PathView />
    </StyledToolbar>
  );
});

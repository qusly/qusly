import * as React from 'react';

import { Tabbar } from '../Tabbar';
import ToolbarButton from '../ToolbarButton';
import { icons } from '~/renderer/constants';
import { StyledToolbar } from './styles';

export const Toolbar = () => (
  <StyledToolbar>
    <Tabbar />
    <ToolbarButton icon={icons.refresh} />
    <ToolbarButton icon={icons.viewList} />
    <ToolbarButton icon={icons.starOutline} size={20} />
    <ToolbarButton icon={icons.info} />
  </StyledToolbar>
);

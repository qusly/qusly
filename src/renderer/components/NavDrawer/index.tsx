import * as React from 'react';

import { NavDrawerItem } from '../NavDrawerItem';
import { StyledNavDrawer } from './styles';
import { icons } from '~/renderer/constants';

export const NavDrawer = () => (
  <StyledNavDrawer>
    <NavDrawerItem icon={icons.home} selected>
      Home
    </NavDrawerItem>
    <NavDrawerItem icon={icons.harddisk}>Disks</NavDrawerItem>
  </StyledNavDrawer>
);

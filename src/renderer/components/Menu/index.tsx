import * as React from 'react';

import { NavDrawer } from '../NavDrawer';
import { NavDrawerItem } from '../NavDrawerItem';
import { icons } from '~/renderer/constants';

export const Menu = () => (
  <NavDrawer>
    <NavDrawerItem icon={icons.home}>Home</NavDrawerItem>
    <NavDrawerItem icon={icons.harddisk}>Disks</NavDrawerItem>
  </NavDrawer>
);

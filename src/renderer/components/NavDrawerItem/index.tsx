import * as React from 'react';

import Ripple from '../Ripple';
import { PRIMARY_COLOR } from '~/renderer/constants';
import store from '~/renderer/store';
import { StyledNavDrawerItem, StyledIcon, StyledLabel } from './styles';

interface IProps {
  id?: number;
  selected?: boolean;
  icon: any;
  children?: any;
}

const onClick = (id: number) => () => {
  store.navDrawerStore.selectedItem = id;
};

export const NavDrawerItem = ({ id, selected, icon, children }: IProps) => (
  <StyledNavDrawerItem selected={selected} onClick={onClick(id)}>
    <StyledIcon selected={selected} icon={icon} />
    <StyledLabel selected={selected}>{children}</StyledLabel>
    <Ripple color={selected ? PRIMARY_COLOR : '#000'} disabled={selected} />
  </StyledNavDrawerItem>
);

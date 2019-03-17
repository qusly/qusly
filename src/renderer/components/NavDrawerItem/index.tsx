import * as React from 'react';

import { PRIMARY_COLOR } from '~/renderer/constants';
import Ripple from '../Ripple';
import { StyledNavDrawerItem, StyledIcon, StyledLabel } from './styles';

interface IProps {
  selected?: boolean;
  icon: any;
  children?: any;
}

export const NavDrawerItem = ({ selected, icon, children }: IProps) => (
  <StyledNavDrawerItem selected={selected}>
    <StyledIcon selected={selected} icon={icon} />
    <StyledLabel selected={selected}>{children}</StyledLabel>
    <Ripple color={selected ? PRIMARY_COLOR : '#000'} disabled={selected} />
  </StyledNavDrawerItem>
);

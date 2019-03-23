import * as React from 'react';

import Ripple from '../Ripple';
import { PRIMARY_COLOR } from '~/renderer/constants';
import { StyledItem, StyledIcon, StyledLabel } from './styles';

type ClickEvent = (id: number) => void;

interface IProps {
  id?: number;
  icon?: any;
  selected?: boolean;
  onClick?: ClickEvent;
  children?: any;
}

const handleClick = (onClick: ClickEvent, id: number) => () => {
  if (typeof onClick === 'function') {
    onClick(id);
  }
};

export const BottomNavItem = ({
  id,
  icon,
  selected,
  onClick,
  children,
}: IProps) => (
  <StyledItem onClick={handleClick(onClick, id)}>
    <StyledIcon icon={icon} selected={selected} />
    <StyledLabel selected={selected}>{children}</StyledLabel>
    <Ripple color={selected ? PRIMARY_COLOR : '#000'} />
  </StyledItem>
);

import * as React from 'react';

import store from '~/renderer/app/store';
import { StyledItem } from './style';

interface ItemProps {
  onClick?: (e: React.MouseEvent) => void;
  icon?: string;
  disabled?: boolean;
  children: any;
}

export const ContextMenuItem = ({ icon, onClick, children, disabled }: ItemProps) => {
  const onItemClick = (e: React.MouseEvent) => {
    store.contextMenu.visible = false;
    if (onClick) onClick(e);
  }

  return (
    <StyledItem
      onMouseDown={e => e.stopPropagation()}
      onClick={onItemClick}
      icon={icon}
      disabled={disabled}>
      {children}
    </StyledItem>
  );
};

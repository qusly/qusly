import * as React from 'react';

import { StyledMenuItem } from './styles';

export const MenuItem = ({
  label,
  onClick,
  selected,
}: {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  selected?: boolean;
}) => {
  return (
    <StyledMenuItem onClick={onClick} selected={selected}>
      {label}
    </StyledMenuItem>
  );
};

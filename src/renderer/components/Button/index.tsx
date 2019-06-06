import * as React from 'react';

import { StyledButton } from './styles';

interface Props {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: any;
  children?: any;
}

export default ({ children, onClick, style }: Props) => {
  return (
    <StyledButton onClick={onClick} style={style}>
      {children}
    </StyledButton>
  );
};

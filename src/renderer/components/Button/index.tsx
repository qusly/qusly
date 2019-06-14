import * as React from 'react';
import { Ripple } from 'wexond-ui';

import { StyledButton, StyledLabel } from './styles';

interface Props {
  background?: string;
  foreground?: string;
  type?: 'contained' | 'outlined';
  children?: any;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: any;
}

export const Button = ({
  background,
  foreground,
  type,
  onClick,
  children,
  style,
}: Props) => (
  <StyledButton
    background={background}
    foreground={foreground}
    type={type}
    onClick={onClick}
    style={style}
  >
    <StyledLabel>{children}</StyledLabel>
    <Ripple color={foreground} />
  </StyledButton>
);

Button.defaultProps = {
  foreground: '#fff',
  background: '#3F51B5',
};

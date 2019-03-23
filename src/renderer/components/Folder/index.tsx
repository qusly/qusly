import * as React from 'react';

import { StyledContainer, StyledLabel, StyledIcon } from './styles';

export const Folder = ({ children }: { children: any }) => (
  <StyledContainer>
    <StyledIcon />
    <StyledLabel>{children}</StyledLabel>
  </StyledContainer>
);

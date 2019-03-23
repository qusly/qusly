import * as React from 'react';

import { StyledContainer, StyledMedia, StyledLabel } from './styles';

interface IProps {
  icon?: string;
  image?: string;
  children: any;
}

export const File = ({ icon, image, children }: IProps) => (
  <StyledContainer>
    <StyledMedia image={image} icon={icon} />
    <StyledLabel>{children}</StyledLabel>
  </StyledContainer>
);

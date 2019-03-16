import * as React from 'react';

import { StyledPathView, StyledLabel, StyledChevron } from './styles';

export default () => {
  return (
    <StyledPathView>
      <StyledLabel>Home</StyledLabel>
      <StyledChevron />
      <StyledLabel>Documents</StyledLabel>
    </StyledPathView>
  );
};

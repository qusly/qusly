import * as React from 'react';

import { StyledSidebar, StyledPage, Title } from './style';

const Explorer = () => {
  return (
    <StyledPage>
      <Title>Explorer</Title>
    </StyledPage>
  );
}

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <Explorer />
    </StyledSidebar>
  );
}

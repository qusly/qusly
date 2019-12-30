import * as React from 'react';
import { Resizable } from 'resizable-box';

import { Explorer } from './Explorer';
import { Sites } from './Sites';
import { StyledSidebar } from './style';

export const Sidebar = () => {
  return (
    <Resizable
      direction="right"
      defaultSize={256}
      minSize={128}
      maxSize={512}
      style={{ height: '100%' }}
    >
      <StyledSidebar>
        <Explorer />
        <Sites />
      </StyledSidebar>
    </Resizable>
  );
};

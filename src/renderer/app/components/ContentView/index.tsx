import React from 'react';

import { Appbar } from '../Appbar';
import { Page } from '../Page';
import { StyledContentView } from './style';

export const ContentView = () => {
  return (
    <StyledContentView>
      <Appbar />
      <Page />
    </StyledContentView>
  );
};

import React from 'react';

import { PathView } from '../PathView';
import { Navigation } from '../Navigation';
import { StyledToolbar } from './style';

export const Toolbar = () => {
  return (
    <StyledToolbar>
      <Navigation />
      <PathView />
    </StyledToolbar>
  );
};

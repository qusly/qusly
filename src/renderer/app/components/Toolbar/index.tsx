import * as React from 'react';

import { NavigationButtons } from '../NavigationButtons';
import { StyledToolbar } from './style';

export const Toolbar = () => {
  return (
    <StyledToolbar>
      <NavigationButtons />
    </StyledToolbar>
  );
};

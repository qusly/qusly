import * as React from 'react';

import { NavigationButtons } from '../NavigationButtons';
import { PathView } from '../PathView';
import { StyledToolbar } from './style';

export const Toolbar = () => {
  return (
    <StyledToolbar>
      <NavigationButtons />
      <PathView />
    </StyledToolbar>
  );
};

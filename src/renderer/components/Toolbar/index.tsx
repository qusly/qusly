import * as React from 'react';

import NavigationButtons from '../NavigationButtons';
import PathView from '../PathView';
import { StyledToolbar, Search } from './styles';

export default () => {
  return (
    <StyledToolbar>
      <NavigationButtons />
      <PathView />
    </StyledToolbar>
  );
};

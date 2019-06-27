import * as React from 'react';

import AppBar from '../AppBar';
import Page from '../Page';
import { StyledContent } from './styles';

export default () => {
  return (
    <StyledContent>
      <AppBar />
      <Page />
    </StyledContent>
  );
};

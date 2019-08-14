import * as React from 'react';

import Appbar from '../Appbar';
import { Page } from '../Page';
import { StyledContent } from './style';

export const Content = () => {
  return (
    <StyledContent>
      <Appbar />
      <Page />
    </StyledContent>
  );
}

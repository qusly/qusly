import * as React from 'react';

import { Appbar } from '../Appbar';
import { Page } from '../Page';
import { TransferOverlay } from '../TransferOverlay';
import { StyledContent } from './style';

export const Content = () => {
  return (
    <StyledContent>
      <Appbar />
      <Page />
      <TransferOverlay />
    </StyledContent>
  );
};

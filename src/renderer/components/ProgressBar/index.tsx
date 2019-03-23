import * as React from 'react';

import { StyledProgressBar, StyledTrack, StyledIndicator } from './styles';

export const ProgressBar = ({ progress }: { progress: number }) => (
  <StyledProgressBar>
    <StyledTrack />
    <StyledIndicator style={{ width: `${progress}%` }} />
  </StyledProgressBar>
);

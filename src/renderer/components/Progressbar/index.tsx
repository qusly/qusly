import * as React from 'react';

import { StyledProgressbar, Line, Track } from './style';

export const Progressbar = ({ value, style }: { value: number, style?: React.CSSProperties }) => {
  return (
    <StyledProgressbar style={style}>
      <Line />
      <Track style={{ width: `${value}%` }} />
    </StyledProgressbar>
  );
}

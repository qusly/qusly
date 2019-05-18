import * as React from 'react';

import { StyledPathView, StyledPathItem, Chevron } from './styles';

export const PathItem = ({ last }: { last: boolean }) => {
  return (
    <>
      <StyledPathItem last={last}>Item</StyledPathItem>
      {!last && <Chevron />}
    </>
  );
};

export default () => {
  return (
    <StyledPathView>
      <PathItem last={false} />
      <PathItem last />
    </StyledPathView>
  );
};

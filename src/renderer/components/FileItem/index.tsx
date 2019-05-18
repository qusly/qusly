import * as React from 'react';
import { File } from 'qusly-core';

import { StyledFileItem, Icon, Label } from './styles';

export default ({ data }: { data?: File }) => {
  return (
    <StyledFileItem>
      <Icon />
      <Label>{(data && data.name) || 'XDDD'}</Label>
    </StyledFileItem>
  );
};

import * as React from 'react';

import { Site } from '~/renderer/models';
import { StyledItem, Label, User } from './styles';

export default ({ data }: { data: Site }) => {
  return (
    <StyledItem>
      <Label>{data.title}</Label>
      <User>{data.user}</User>
    </StyledItem>
  );
};

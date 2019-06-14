import * as React from 'react';

import { StyledItem, Label, User } from './styles';

export default ({ label, user }: { label: string; user: string }) => {
  return (
    <StyledItem>
      <Label>{label}</Label>
      <User>{user}</User>
    </StyledItem>
  );
};

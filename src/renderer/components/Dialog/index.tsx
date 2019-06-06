import * as React from 'react';

import { StyledDialog, Title, Buttons } from './styles';
import Button from '../Button';

export default ({ title, children }: { title: string; children?: any }) => {
  return (
    <StyledDialog>
      <Title>{title}</Title>
      {children}
      <Buttons>
        <Button>CLOSE</Button>
        <Button>OK</Button>
      </Buttons>
    </StyledDialog>
  );
};

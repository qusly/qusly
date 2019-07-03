import * as React from 'react';

import AppBar from '../AppBar';
import Page from '../Page';
import Details from '../Details';
import { StyledContent, Container } from './styles';

export default () => {
  return (
    <StyledContent>
      <AppBar />
      <Container>
        <Page />
        <Details />
      </Container>
    </StyledContent>
  );
};

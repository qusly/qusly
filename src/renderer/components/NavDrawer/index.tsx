import * as React from 'react';

import Resizable from '../Resizable';
import { StyledNavDrawer } from './styles';

export default () => {
  return (
    <Resizable>
      <StyledNavDrawer />
    </Resizable>
  );
};

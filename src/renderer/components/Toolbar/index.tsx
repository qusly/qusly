import { observer } from 'mobx-react';
import * as React from 'react';

import { Tabbar } from '../Tabbar';
import { StyledToolbar } from './style';

export const Toolbar = observer(() => {
  return (
    <StyledToolbar>
      <Tabbar />
    </StyledToolbar>
  );
});

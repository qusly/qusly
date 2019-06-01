import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import PathItem from '../PathItem';
import { StyledPathView } from './styles';

export default observer(() => {
  return (
    <StyledPathView>
      {store.pages.current.pathItems.map((label, index) => (
        <PathItem key={index} pathIndex={index} label={label} />
      ))}
    </StyledPathView>
  );
});

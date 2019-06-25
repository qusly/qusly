import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { StyledPathItem } from './styles';

const onClick = (index: number) => (e: React.MouseEvent) => {
  e.stopPropagation();
  store.pages.current.location.go(index);
};

export default observer(
  ({ label, pathIndex }: { label: string; pathIndex: number }) => {
    return (
      <StyledPathItem onClick={onClick(pathIndex)}>{label}</StyledPathItem>
    );
  },
);

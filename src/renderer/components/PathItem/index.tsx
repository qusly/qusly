import * as React from 'react';

import store from '~/renderer/store';
import { StyledPathItem } from './styles';

const onClick = (index: number) => () => {
  store.session.pathManager.slice(index);
};

export default ({ label, pathIndex }: { label: string; pathIndex: number }) => {
  return <StyledPathItem onClick={onClick(pathIndex)}>{label}</StyledPathItem>;
};

import * as React from 'react';

import store from '~/renderer/store';
import { StyledPathItem } from './styles';

const onClick = (index: number) => (e: React.MouseEvent) => {
  e.stopPropagation();

  const page = store.pages.current;

  page.location.go(index);
  page.fetchFiles();
};

export default ({ label, pathIndex }: { label: string; pathIndex: number }) => {
  return <StyledPathItem onClick={onClick(pathIndex)}>{label}</StyledPathItem>;
};

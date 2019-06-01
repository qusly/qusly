import * as React from 'react';

import store from '~/renderer/store';
import { StyledPathItem } from './styles';

const onClick = (index: number) => () => {
  const page = store.pages.current;

  page.pathItems = page.pathItems.slice(0, index + 1);
  page.fetchFiles();
};

export default ({ label, pathIndex }: { label: string; pathIndex: number }) => {
  return <StyledPathItem onClick={onClick(pathIndex)}>{label}</StyledPathItem>;
};

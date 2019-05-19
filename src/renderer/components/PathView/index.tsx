import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { StyledPathView, StyledPathItem } from './styles';

const onClick = (index: number) => () => {
  if (store.session.status === 'ok') {
    store.session.path = store.session.path.slice(0, index + 1);
    store.session.loadFiles();
  }
};

export const PathItem = ({
  label,
  pathIndex,
}: {
  label: string;
  pathIndex: number;
}) => {
  return <StyledPathItem onClick={onClick(pathIndex)}>{label}</StyledPathItem>;
};

export default observer(() => {
  return (
    <StyledPathView>
      {store.session.path.map((label, index) => (
        <PathItem key={label} label={label} pathIndex={index} />
      ))}
    </StyledPathView>
  );
});

import * as React from 'react';

import Resizable from '../Resizable';
import TreeView from '../TreeView';
import { Container } from './styles';

export default () => {
  const style = {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  };

  return (
    <Resizable style={style}>
      <Container>
        <TreeView />
      </Container>
    </Resizable>
  );
};

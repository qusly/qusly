import * as React from 'react';

import Resizable from '../Resizable';
import TreeView from '../TreeView';

export default () => {
  const style = {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  };

  return (
    <Resizable style={style}>
      <TreeView />
    </Resizable>
  );
};

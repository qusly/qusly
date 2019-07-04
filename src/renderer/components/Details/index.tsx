import * as React from 'react';

import Resizable from '../Resizable';
import DetailsItem from '../DetailsItem';

export default () => {
  return (
    <Resizable
      pos="left"
      style={{
        borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <DetailsItem />
    </Resizable>
  );
};

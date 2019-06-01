import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import TreeItem from '../TreeItem';

export default observer(() => {
  return (
    <React.Fragment>
      {store.sessions.current.tree.items.map(item => (
        <TreeItem key={item._id} data={item} />
      ))}
    </React.Fragment>
  );
});

import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import Item from '../FileTreeItem';

export default observer(() => {
  return (
    <React.Fragment>
      {store.sessions.current.tree.items.map(item => (
        <Item key={item._id} data={item} />
      ))}
    </React.Fragment>
  );
});

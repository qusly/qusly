import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import Item from '../FileTreeItem';

export default observer(() => {
  const session = store.sessions.current;

  return (
    <React.Fragment>
      {session &&
        session.tree.items.map(item => <Item key={item._id} data={item} />)}
    </React.Fragment>
  );
});

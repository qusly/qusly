import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import Item from '../FileTreeItem';
import { Pagebar, PageTitle } from '../SitesManager/styles';

export default observer(() => {
  const session = store.sessions.current;

  return (
    <React.Fragment>
      <Pagebar>
        <PageTitle>Explorer</PageTitle>
      </Pagebar>
      {session &&
        session.tree.items.map(item => <Item key={item._id} data={item} />)}
    </React.Fragment>
  );
});

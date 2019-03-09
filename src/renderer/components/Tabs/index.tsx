import * as React from 'react';
import { observer } from 'mobx-react';

import Tab from '../Tab';
import store from '~/renderer/store';

export const Tabs = observer(() => {
  return (
    <React.Fragment>
      {store.tabsStore.tabs.map(item => (
        <Tab key={item.id} tab={item} />
      ))}
    </React.Fragment>
  );
});

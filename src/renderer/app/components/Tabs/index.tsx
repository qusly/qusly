import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import Tab from '../Tab';

export const Tabs = observer(() => {
  return (
    <>
      {store.tabs.list.map(item => (
        <Tab key={item.id} tab={item} />
      ))}
    </>
  );
});

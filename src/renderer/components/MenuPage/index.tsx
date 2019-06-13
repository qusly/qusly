import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { MENU_PAGE } from '~/renderer/constants';

export default observer(
  ({ page, children }: { page: MENU_PAGE; children?: any }) => {
    return (
      <React.Fragment>
        {store.menu.selected === page && children}
      </React.Fragment>
    );
  },
);

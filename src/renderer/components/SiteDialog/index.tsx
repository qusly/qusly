import * as React from 'react';
import { observer } from 'mobx-react';
import { Dropdown, MenuItem } from 'wexond-ui';

import Dialog from '../Dialog';
import store from '~/renderer/store';

export default observer(() => {
  return (
    <Dialog title="Add new site" visible={store.overlay.content === 'add-site'}>
      <Dropdown>
        <MenuItem label="FTP" />
        <MenuItem label="FTPS" />
        <MenuItem label="SFTP" />
      </Dropdown>
    </Dialog>
  );
});

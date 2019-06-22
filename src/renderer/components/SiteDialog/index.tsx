import * as React from 'react';
import { observer } from 'mobx-react';
import { Textfield } from 'wexond-ui';

import Dialog from '../Dialog';
import store from '~/renderer/store';
import { MenuItem } from '../MenuItem';
import { Dropdown } from '../Dropdown';
import { Form } from './styles';

export default observer(() => {
  return (
    <Dialog title="Add new site" visible={store.overlay.content === 'add-site'}>
      <Form>
        <Dropdown defaultValue="SFTP">
          <MenuItem label="FTP" />
          <MenuItem label="FTPS" />
          <MenuItem label="SFTP" />
        </Dropdown>
        <Textfield label="Hostname"  />
      </Form>
    </Dialog>
  );
});

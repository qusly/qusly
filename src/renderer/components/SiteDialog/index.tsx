import * as React from 'react';
import { observer } from 'mobx-react';
import { Textfield } from 'wexond-ui';

import Dialog from '../Dialog';
import store from '~/renderer/store';
import { MenuItem } from '../MenuItem';
import { Dropdown } from '../Dropdown';
import { Form } from './styles';

export default observer(() => {
  const inputStyle = {
    width: '100%',
    marginTop: 24,
  };

  return (
    <Dialog
      title="Add new site"
      visible={store.overlay.content === 'add-site'}
      style={{ width: 344 }}
    >
      <Form>
        <Dropdown label="Protocol" style={{ width: '100%' }}>
          <MenuItem label="FTP" />
          <MenuItem label="FTPS" />
          <MenuItem label="SFTP" />
        </Dropdown>
        <Textfield label="Port" style={{ width: '100%', marginLeft: 24 }} />
      </Form>
      <Textfield label="Hostname" style={inputStyle} />
      <Textfield label="Username" style={inputStyle} />
      <Textfield label="Password" inputType="password" style={inputStyle} />
    </Dialog>
  );
});

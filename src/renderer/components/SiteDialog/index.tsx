import * as React from 'react';
import { observer } from 'mobx-react';
import { IProtocol } from 'qusly-core';

import store from '~/renderer/store';
import { Form, digitsOnly, notEmpty } from '~/renderer/models';
import { MenuItem } from '../MenuItem';
import { Dropdown } from '../Dropdown';
import { Textfield } from '../Textfield';
import { PasswordInput } from '../PasswordInput';
import { Button } from '../Button';
import { CloseButton, Dialog, Title, Content, Buttons } from '../Dialog';
import { Column } from './styles';

const form = new Form({
  protocol: React.createRef<Dropdown>(),
  port: React.createRef<Textfield>(),
  title: React.createRef<Textfield>(),
  host: React.createRef<Textfield>(),
  user: React.createRef<Textfield>(),
  password: React.createRef<PasswordInput>(),
});

const onClick = async () => {
  if (!form.validate()) return;

  const { title, protocol, port, host, user, password } = form.values;

  await store.sites.add({
    title: title || host,
    protocol: protocol.toLowerCase() as IProtocol,
    port: parseInt(port, 10),
    host,
    user,
    password,
  });

  store.overlay.hide();
  form.clear();
};

export default observer(() => {
  const inputStyle = {
    width: '100%',
    marginTop: 24,
  };

  return (
    <Dialog
      visible={store.overlay.content === 'add-site'}
      style={{ width: 344 }}
    >
      <Title>Add a new site</Title>
      <Content>
        <Textfield
          ref={form.fields.title}
          label="Title (optional)"
          style={{ width: '100%' }}
        />
        <Column>
          <Dropdown
            ref={form.fields.protocol}
            label="Protocol"
            style={{ width: '100%' }}
          >
            <MenuItem label="SFTP" />
            <MenuItem label="FTP" />
            <MenuItem label="FTPS" />
          </Dropdown>
          <Textfield
            ref={form.fields.port}
            label="Port"
            inputType="number"
            test={digitsOnly}
            style={{ width: '100%', marginLeft: 24 }}
          />
        </Column>
        <Textfield
          ref={form.fields.host}
          label="Hostname"
          test={notEmpty}
          style={inputStyle}
        />
        <Textfield
          ref={form.fields.user}
          label="Username"
          test={notEmpty}
          style={inputStyle}
        />
        <PasswordInput ref={form.fields.password} style={inputStyle} />
      </Content>
      <Buttons>
        <CloseButton />
        <Button background="transparent" foreground="#3F51B5" onClick={onClick}>
          ADD
        </Button>
      </Buttons>
    </Dialog>
  );
});

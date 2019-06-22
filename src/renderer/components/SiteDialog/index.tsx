import * as React from 'react';
import { observer } from 'mobx-react';
import { IProtocol } from 'qusly-core';

import store from '~/renderer/store';
import { MenuItem } from '../MenuItem';
import { Dropdown } from '../Dropdown';
import { Textfield } from '../Textfield';
import { PasswordInput } from '../PasswordInput';
import { Form } from './styles';
import { Button } from '../Button';
import { CloseButton, Dialog, Title, Content, Buttons } from '../Dialog';

const digitsOnly = (str: string) => notEmpty(str) && /^\d+$/.test(str);

const notEmpty = (str: string) => str.trim().length !== 0;

const inputs = {
  protocol: React.createRef<Dropdown>(),
  port: React.createRef<Textfield>(),
  title: React.createRef<Textfield>(),
  hostname: React.createRef<Textfield>(),
  username: React.createRef<Textfield>(),
  password: React.createRef<PasswordInput>(),
};

const iterate = (fn: (input: any) => void) => {
  for (const key in inputs) {
    fn((inputs as any)[key].current);
  }
};

const validate = () => {
  let error = false;
  iterate(input => {
    if (!input.test()) {
      error = true;
    }
  });
  return !error;
};

const clear = () => iterate(input => input.clear());

const onClick = async () => {
  if (!validate()) return;
  const host = inputs.hostname.current.value;

  await store.sites.add({
    title: inputs.title.current.value || host,
    protocol: inputs.protocol.current.value as IProtocol,
    port: parseInt(inputs.port.current.value, 10),
    host,
    user: inputs.username.current.value,
    password: inputs.password.current.value,
  });

  clear();
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
          ref={inputs.title}
          label="Title (optional)"
          style={{ width: '100%' }}
        />
        <Form>
          <Dropdown
            ref={inputs.protocol}
            label="Protocol"
            style={{ width: '100%' }}
          >
            <MenuItem label="SFTP" />
            <MenuItem label="FTP" />
            <MenuItem label="FTPS" />
          </Dropdown>
          <Textfield
            ref={inputs.port}
            label="Port"
            inputType="number"
            test={digitsOnly}
            style={{ width: '100%', marginLeft: 24 }}
          />
        </Form>
        <Textfield
          ref={inputs.hostname}
          label="Hostname"
          test={notEmpty}
          style={inputStyle}
        />
        <Textfield
          ref={inputs.username}
          label="Username"
          test={notEmpty}
          style={inputStyle}
        />
        <PasswordInput ref={inputs.password} style={inputStyle} />
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

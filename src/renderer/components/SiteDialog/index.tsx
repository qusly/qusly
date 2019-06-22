import * as React from 'react';
import { observer } from 'mobx-react';

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

const validateInputs = () => {
  let error = false;
  for (const key in inputs) {
    if (!(inputs as any)[key].current.test()) {
      error = true;
    }
  }
  return !error;
};

const onClick = () => {
  if (validateInputs()) {
    console.log('yes!');
  }
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
          test={notEmpty}
          style={{ width: '100%' }}
        />
        <Form>
          <Dropdown
            ref={inputs.protocol}
            label="Protocol"
            style={{ width: '100%' }}
          >
            <MenuItem label="FTP" />
            <MenuItem label="FTPS" />
            <MenuItem label="SFTP" />
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

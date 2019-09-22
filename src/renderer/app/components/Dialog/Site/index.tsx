import * as React from 'react';
import { IProtocol } from 'qusly-core';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { ensureValue, getValues, setValues, clearValues } from '~/renderer/app/utils';
import { Dropdown, DropdownItem } from '~/renderer/components/Dropdown';
import { CloseButton } from '..';
import { Title, Content, Buttons, DialogButton, Container } from '../style';
import { Input, Row } from './style';

export const SiteDialog = observer(() => {
  const content = store.dialog.content;

  const titleRef = React.useRef<HTMLInputElement>();
  const protocolRef = React.useRef<Dropdown>();
  const portRef = React.useRef<HTMLInputElement>();
  const hostnameRef = React.useRef<HTMLInputElement>();
  const userRef = React.useRef<HTMLInputElement>();
  const passwordRef = React.useRef<HTMLInputElement>();
  const [disabled, setDisabled] = React.useState(true);

  const onInput = React.useCallback(() => {
    const hasValue = ensureValue(hostnameRef, userRef, passwordRef);
    setDisabled(!hasValue);
  }, []);

  const onAdd = React.useCallback(() => {
    const [title, port, host, user, password] = getValues(titleRef, portRef, hostnameRef, userRef, passwordRef);
    const defaultPort = protocolRef.current.value === 'sftp' ? 22 : 21;

    store.sites.add({
      title: title || host,
      port: port.length ? parseInt(port, 10) : defaultPort,
      protocol: protocolRef.current.value as IProtocol,
      host,
      user,
      password,
    });

    store.dialog.hide();
  }, []);

  React.useEffect(() => {
    if (content === 'edit-site') {
      const { title, protocol, port, host, user, password } = store.contextMenu.focusedSite;

      setValues([titleRef, title], [protocolRef, protocol], [portRef, port], [hostnameRef, host], [userRef, user], [passwordRef, password]);
      setDisabled(false);
    } else if (content === 'add-site') {
      protocolRef.current.value = 'sftp';

      clearValues(titleRef, portRef, hostnameRef, userRef, passwordRef);
      setDisabled(true);
    }
  }, [content]);

  return (
    <Container visible={content === 'add-site' || content === 'edit-site'}>
      <Title>{content === 'edit-site' ? 'Edit' : 'New'} site</Title>
      <Content>
        <Input ref={titleRef} placeholder='Title (optional)' onInput={onInput} />
        <Row>
          <Dropdown ref={protocolRef} defaultValue='sftp' style={{ width: '100%' }}>
            <DropdownItem value='ftp'>FTP</DropdownItem>
            <DropdownItem value='ftps'>FTPS</DropdownItem>
            <DropdownItem value='sftp'>SFTP</DropdownItem>
          </Dropdown>
          <Input ref={portRef} placeholder='Port (optional)' onInput={onInput} style={{ marginLeft: 16, marginTop: 0 }} />
        </Row>
        <Input ref={hostnameRef} placeholder='Hostname' onInput={onInput} />
        <Input ref={userRef} placeholder='User' onInput={onInput} />
        <Input ref={passwordRef} placeholder='Password' onInput={onInput} />
      </Content>
      <Buttons>
        <CloseButton />
        <DialogButton label='Add' disabled={disabled} onClick={onAdd} />
      </Buttons>
    </Container>
  );
});

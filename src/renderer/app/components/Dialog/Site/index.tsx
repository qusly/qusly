import * as React from 'react';
import { IProtocol } from 'qusly-core';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { ISite } from '~/interfaces';
import { Dropdown, DropdownItem } from '~/renderer/components/Dropdown';
import { CloseButton, DialogContainer } from '..';
import { Title, Content, Buttons, DialogButton } from '../style';
import { Input, Row } from './style';
import {
  ensureValue,
  getValues,
  setValues,
  clearValues,
} from '~/renderer/app/utils/input';

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

  const onSave = React.useCallback(() => {
    const [title, port, host, user, password] = getValues(
      titleRef,
      portRef,
      hostnameRef,
      userRef,
      passwordRef,
    );
    const defaultPort = protocolRef.current.value === 'sftp' ? 22 : 21;

    const site: ISite = {
      title: title || host,
      port: port.length ? parseInt(port, 10) : defaultPort,
      protocol: protocolRef.current.value as IProtocol,
      host,
      user,
      password,
    };

    if (store.dialog.content === 'add-site') {
      store.sites.add(site);
    } else {
      const { _id } = store.contextMenu.focusedSite;

      store.sites.update(_id, site);
    }

    store.dialog.visible = false;
  }, []);

  React.useEffect(() => {
    if (content === 'edit-site') {
      const {
        title,
        protocol,
        port,
        host,
        user,
        password,
      } = store.contextMenu.focusedSite;

      setValues(
        [titleRef, title],
        [protocolRef, protocol],
        [portRef, port],
        [hostnameRef, host],
        [userRef, user],
        [passwordRef, password],
      );
      setDisabled(false);
    } else if (content === 'add-site') {
      protocolRef.current.value = 'sftp';

      clearValues(titleRef, portRef, hostnameRef, userRef, passwordRef);
      setDisabled(true);
    }
  }, [content]);

  return (
    <DialogContainer content={['add-site', 'edit-site']}>
      <Title>{content === 'edit-site' ? 'Edit' : 'New'} site</Title>
      <Content>
        <Input ref={titleRef} placeholder="Title (optional)" />
        <Row>
          <Dropdown
            ref={protocolRef}
            defaultValue="sftp"
            style={{ width: '100%' }}
          >
            <DropdownItem value="ftp">FTP</DropdownItem>
            <DropdownItem value="ftps">FTPS</DropdownItem>
            <DropdownItem value="sftp">SFTP</DropdownItem>
          </Dropdown>
          <Input
            ref={portRef}
            placeholder="Port (optional)"
            type="number"
            style={{ marginLeft: 16, marginTop: 0 }}
          />
        </Row>
        <Input ref={hostnameRef} placeholder="Hostname" onInput={onInput} />
        <Input ref={userRef} placeholder="User" onInput={onInput} />
        <Input ref={passwordRef} placeholder="Password" onInput={onInput} />
      </Content>
      <Buttons>
        <CloseButton />
        <DialogButton label="Save" disabled={disabled} onClick={onSave} />
      </Buttons>
    </DialogContainer>
  );
});

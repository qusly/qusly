import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { ISite } from '~/interfaces';
import store from '~/renderer/app/store';
import { Page } from '..';
import { StyledSite, Label, User } from './style';

const Site = ({ data }: { data: ISite }) => {
  return (
    <StyledSite>
      <Label>{data.title}</Label>
      <User>{data.user}</User>
    </StyledSite>
  );
};

export const Sites = observer(() => {
  const session = store.sessions.current;
  if (!session) return null;

  return (
    <Page title='Sites' content='sites'>
      <Site data={{
        host: 'example.com',
        user: 'test',
        password: '123',
        protocol: 'sftp',
        title: 'My website',
        port: 22
      }} />
    </Page>
  );
});

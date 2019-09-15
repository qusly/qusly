import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { ISite } from '~/interfaces';
import { formatSiteDescription } from '~/renderer/app/utils';
import { Page } from '..';
import { StyledSite, Label, Description } from './style';

const onClick = (site: ISite) => () => {
  store.tabs.addTab({ active: true, site });
}

const Site = ({ data }: { data: ISite }) => {
  return (
    <StyledSite onClick={onClick(data)}>
      <Label>{data.title}</Label>
      <Description>{formatSiteDescription(data)}</Description>
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

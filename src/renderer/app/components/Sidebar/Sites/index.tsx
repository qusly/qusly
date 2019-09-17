import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { ISite } from '~/interfaces';
import { icons } from '~/renderer/constants';
import { formatSiteDescription } from '~/renderer/app/utils';
import { ToolbarButton } from '~/renderer/components/ToolbarButton';
import { StyledPage, Header, Content } from '../style';
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
    <StyledPage visible={store.activitybar.content === 'sites'}>
      <Header>
        Sites
        <ToolbarButton icon={icons.add} />
      </Header>
      <Site data={{
        host: 'example.com',
        user: 'test',
        password: '123',
        protocol: 'sftp',
        title: 'My website',
        port: 22
      }} />
    </StyledPage>
  );
});

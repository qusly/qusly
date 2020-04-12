import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { ISite } from '~/interfaces';
import { ToolbarButton } from '~/renderer/components/ToolbarButton';
import { StyledPage, Header } from '../style';
import { StyledSite, Label, Description } from './style';
import { formatSiteDescription } from '~/renderer/app/utils/site';
import { icons } from '~/renderer/constants/icons';

const onAdd = () => {
  store.dialog.show('add-site');
};

const onClick = (site: ISite) => () => {
  store.sites.openInTab(site);
};

const onContextMenu = (site: ISite) => () => {
  store.contextMenu.focusedSite = site;
  store.contextMenu.show('site');
};

const Site = ({ data }: { data: ISite }) => {
  return (
    <StyledSite onClick={onClick(data)} onContextMenu={onContextMenu(data)}>
      <Label>{data.title}</Label>
      <Description>{formatSiteDescription(data)}</Description>
    </StyledSite>
  );
};

export const Sites = observer(() => {
  return (
    <StyledPage tabIndex={0} visible={store.activitybar.content === 'sites'}>
      <Header>
        Sites
        <ToolbarButton icon={icons.add} onClick={onAdd} />
      </Header>
      {store.sites.list.map(item => (
        <Site key={item._id} data={item} />
      ))}
    </StyledPage>
  );
});

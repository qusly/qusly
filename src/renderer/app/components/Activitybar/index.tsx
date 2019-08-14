import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { SidebarContent } from '~/renderer/app/store/activitybar';
import { icons } from '~/renderer/constants';
import { StyledActivitybar, StyledItem, ItemIcon } from './style';

interface ItemProps {
  content: SidebarContent;
  icon: string;
  disabled?: boolean;
}

const onItemClick = (content: SidebarContent) => () => {
  store.activitybar.content = content;
}

const Item = observer(({ content, icon, disabled }: ItemProps) => {
  const selected = store.activitybar.content === content;

  return (
    <StyledItem onClick={onItemClick(content)} disabled={disabled}>
      <ItemIcon selected={selected} icon={icon} disabled={disabled} />
    </StyledItem>
  );
});

export const Activitybar = () => {
  return (
    <StyledActivitybar>
      <Item content='explorer' icon={icons.fileTree} />
      <Item content='sites-manager' icon={icons.sitesManager} />
      <Item content='search' icon={icons.search} disabled />
      <Item content='transfer' icon={icons.transfer} disabled />
    </StyledActivitybar>
  );
}

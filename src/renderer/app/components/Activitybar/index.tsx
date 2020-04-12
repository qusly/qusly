import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { SidebarContent } from '~/renderer/app/store/activitybar';
import { StyledActivitybar, StyledItem } from './style';
import { icons } from '~/renderer/constants/icons';

interface ItemProps {
  content: SidebarContent;
  icon: string;
  disabled?: boolean;
}

const onItemClick = (content: SidebarContent) => () => {
  store.activitybar.content = content;
};

const Item = observer(({ content, icon, disabled }: ItemProps) => {
  const selected = store.activitybar.content === content;

  return (
    <StyledItem
      onClick={onItemClick(content)}
      selected={selected}
      disabled={disabled}
      icon={icon}
    />
  );
});

export const Activitybar = observer(() => {
  const session = store.sessions.current;

  return (
    <StyledActivitybar>
      <Item content="explorer" icon={icons.fileTree} disabled={!session} />
      <Item content="sites" icon={icons.sitesManager} />
      <Item content="search" icon={icons.search} disabled />
      <Item content="transfer" icon={icons.transfer} disabled />
    </StyledActivitybar>
  );
});

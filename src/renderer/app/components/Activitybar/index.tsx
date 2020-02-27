import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { icons } from '~/renderer/constants/icons';
import { ISidebarContent } from '../../store/sidebar';
import { StyledActivitybar, StyledItem } from './style';

interface ItemProps {
  content: ISidebarContent;
  icon: string;
  disabled?: boolean;
}

const Item = observer(({ content, icon, disabled }: ItemProps) => {
  const selected = store.sidebar.content === content;

  const onClick = React.useCallback(() => {
    store.sidebar.content = content;
  }, [content]);

  return (
    <StyledItem
      selected={selected}
      disabled={disabled}
      icon={icon}
      onClick={onClick}
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
      <Item content="transfer" icon={icons.transfer} />
    </StyledActivitybar>
  );
});

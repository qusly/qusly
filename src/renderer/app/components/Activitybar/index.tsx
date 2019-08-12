import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { ActivitybarContent } from '~/renderer/app/store/activitybar';
import { transparency, icons } from '~/renderer/constants';
import * as style from './style.scss';

interface ItemProps {
  content: ActivitybarContent;
  icon: string;
  disabled?: boolean;
}

const onItemClick = (content: ActivitybarContent) => () => {
  store.activitybar.content = content;
}

const Item = observer(({ content, icon, disabled }: ItemProps) => {
  const opacity = store.activitybar.content === content ? 1 : transparency.icons.inactive;

  const iconStyle = {
    backgroundImage: `url(${icon})`,
    opacity: disabled ? transparency.icons.disabled : opacity,
  }

  return (
    <div className={style.item} onClick={!disabled && onItemClick(content)}>
      <div className={style.itemIcon} style={iconStyle} />
    </div>
  );
});

export const Activitybar = () => {
  return (
    <div className={style.activitybar}>
      <Item content='explorer' icon={icons.fileTree} />
      <Item content='sites-manager' icon={icons.sitesManager} />
      <Item content='search' icon={icons.search} disabled />
      <Item content='transfer' icon={icons.transfer} disabled />
    </div>
  );
}

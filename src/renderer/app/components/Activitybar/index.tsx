import * as React from 'react';

import { icons } from '../../constants/icons';
import * as style from './style.scss';

const Item = ({ icon }: { icon: string }) => {
  const iconStyle = {
    backgroundImage: `url(${icon})`,
  }

  return (
    <div className={style.item}>
      <div className={style.itemIcon} style={iconStyle} />
    </div>
  );
}

export const Activitybar = () => {
  return (
    <div className={style.activitybar}>
      <Item icon={icons.fileTree} />
      <Item icon={icons.sitesManager} />
      <Item icon={icons.search} />
      <Item icon={icons.transfer} />
    </div>
  );
}

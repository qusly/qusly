import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { MENU_PAGE } from '~/renderer/constants';
import { StyledButton, Icon } from './styles';

const onClick = (page: MENU_PAGE) => () => {
  store.menu.selected = page;
};

export const MenuButton = observer(
  ({
    page,
    icon,
    iconSize,
  }: {
    page: MENU_PAGE;
    icon: any;
    iconSize?: number;
  }) => {
    return (
      <StyledButton onClick={onClick(page)}>
        <Icon
          size={iconSize}
          icon={icon}
          selected={store.menu.selected === page}
        />
      </StyledButton>
    );
  },
);

(MenuButton as any).defaultProps = {
  iconSize: 24,
};

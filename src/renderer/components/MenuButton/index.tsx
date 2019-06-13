import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { MENU_PAGE } from '~/renderer/constants';
import { StyledButton, Icon } from './styles';

const onClick = (page: MENU_PAGE) => () => {
  store.menu.selected = page;
};

export default observer(({ page, icon }: { page: MENU_PAGE; icon: any }) => {
  return (
    <StyledButton onClick={onClick(page)}>
      <Icon icon={icon} selected={store.menu.selected === page} />
    </StyledButton>
  );
});

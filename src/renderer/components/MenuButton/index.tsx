import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { MenuContent } from '~/renderer/store/menu';
import { StyledButton, Icon } from './styles';

const onClick = (content: MenuContent) => () => {
  store.menu.content = content;
};

export const MenuButton = observer(
  ({
    content,
    icon,
    iconSize,
    disabled,
  }: {
    content: MenuContent;
    icon: any;
    iconSize?: number;
    disabled?: boolean;
  }) => {
    return (
      <StyledButton onClick={onClick(content)} disabled={disabled}>
        <Icon
          size={iconSize}
          icon={icon}
          selected={store.menu.content === content}
          disabled={disabled}
        />
      </StyledButton>
    );
  },
);

(MenuButton as any).defaultProps = {
  iconSize: 24,
};

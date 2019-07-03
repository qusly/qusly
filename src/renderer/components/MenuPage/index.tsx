import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { MenuContent } from '~/renderer/store/menu';
import { StyledPage } from './styles';

export default observer(
  ({
    content,
    children,
    style,
  }: {
    content: MenuContent;
    children?: any;
    style?: any;
  }) => {
    if (store.menu.content !== content) return null;

    return <StyledPage style={style}>{children}</StyledPage>;
  },
);

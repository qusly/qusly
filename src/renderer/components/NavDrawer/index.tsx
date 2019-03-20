import * as React from 'react';
import { observer } from 'mobx-react';

import Resizable from '../Resizable';
import { DEFAULT_NAV_DRAWER_WIDTH } from '~/renderer/constants';
import store from '~/renderer/store';
import { StyledNavDrawer } from './styles';

const onResize = (width: number) => {
  store.navDrawerStore.width = width;
};

export const NavDrawer = observer(({ children }: { children?: any }) => (
  <StyledNavDrawer>
    <Resizable
      defaultWidth={DEFAULT_NAV_DRAWER_WIDTH}
      minWidth={196}
      maxWidth={360}
      onResize={onResize}
    >
      {React.Children.map(children, (e: React.ReactElement<any>, index) => {
        return React.cloneElement(e, {
          id: index,
          selected: index === store.navDrawerStore.selectedItem,
        });
      })}
    </Resizable>
  </StyledNavDrawer>
));

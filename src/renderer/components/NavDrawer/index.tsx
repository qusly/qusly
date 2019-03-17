import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { StyledNavDrawer } from './styles';

export const NavDrawer = observer(({ children }: { children?: any }) => (
  <StyledNavDrawer>
    {React.Children.map(children, (e: React.ReactElement<any>, index) => {
      return React.cloneElement(e, {
        id: index,
        selected: index === store.navDrawerStore.selectedItem,
      });
    })}
  </StyledNavDrawer>
));

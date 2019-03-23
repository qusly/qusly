import * as React from 'react';
import { observer } from 'mobx-react';

import Resizable from '../Resizable';
import store from '~/renderer/store';
import { InfoPanelPage } from '~/renderer/store/info-panel';
import { Details } from '../Details';
import { BottomNavItem } from '../BottomNavItem';
import { icons } from '~/renderer/constants';
import BottomNav from '../BottomNav';
import { StyledContainer } from './styles';

const onResize = (width: number) => {
  store.infoPanelStore.width = width;
};

const NavWrapper = () => (
  <BottomNav defaultSelected={2} style={{ marginTop: 'auto' }}>
    <BottomNavItem icon={icons.download}>Downloaded</BottomNavItem>
    <BottomNavItem icon={icons.upload}>Uploaded</BottomNavItem>
    <BottomNavItem icon={icons.info} selected>
      Details
    </BottomNavItem>
  </BottomNav>
);

export const InfoPanel = observer(({ children }: { children?: any }) => {
  const { selectedPage } = store.infoPanelStore;

  return (
    <StyledContainer>
      <Resizable
        pos="left"
        defaultWidth={256}
        minWidth={128}
        maxWidth={512}
        onResize={onResize}
      >
        {selectedPage === InfoPanelPage.Details && <Details />}
        <NavWrapper />
      </Resizable>
    </StyledContainer>
  );
});

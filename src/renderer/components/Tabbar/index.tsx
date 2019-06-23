import { observer } from 'mobx-react';
import * as React from 'react';

import store from '~/renderer/store';
import HorizontalScrollbar from '../HorizontalScrollbar';
import { icons } from '~/renderer/constants/icons';
import { Tabs } from '../Tabs';

import { AddTab, StyledTabbar, TabsContainer, TabbarBackground } from './style';

const getContainer = () => store.tabs.containerRef.current;

const onMouseEnter = () => (store.tabs.scrollbarVisible = true);

const onMouseLeave = () => (store.tabs.scrollbarVisible = false);

const onAddTabClick = () => {
  store.tabs.addTab(store.sessions.current.site);
};

const Tabbar = observer(() => {
  return (
    <StyledTabbar>
      <TabsContainer
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={store.tabs.containerRef}
      >
        <Tabs />
      </TabsContainer>
      <AddTab
        icon={icons.add}
        onClick={onAddTabClick}
        divRef={(r: any) => (store.addTab.ref = r)}
      />
      <HorizontalScrollbar
        ref={store.tabs.scrollbarRef}
        enabled={store.tabs.scrollable}
        visible={store.tabs.scrollbarVisible}
        getContainer={getContainer}
      />
    </StyledTabbar>
  );
});

export default observer(() => {
  const session = store.sessions.current;

  return (
    <TabbarBackground white={session == null}>
      {session && <Tabbar />}
    </TabbarBackground>
  );
});

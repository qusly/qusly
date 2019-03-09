import { observer } from 'mobx-react';
import * as React from 'react';

import HorizontalScrollbar from '../HorizontalScrollbar';
import { Tabs } from '../Tabs';
import store from '~/renderer/store';
import { icons } from '~/renderer/constants';
import { StyledTabbar, TabsContainer, Indicator, AddTab } from './style';

const getContainer = () => store.tabsStore.containerRef.current;

const onMouseEnter = () => (store.tabsStore.scrollbarVisible = true);

const onMouseLeave = () => (store.tabsStore.scrollbarVisible = false);

const onAddTabClick = () => store.tabsStore.addTab('Tab');

export const Tabbar = observer(() => {
  return (
    <StyledTabbar>
      <TabsContainer
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={store.tabsStore.containerRef}
      >
        <Tabs />
        <Indicator ref={store.tabsStore.indicatorRef} />
      </TabsContainer>
      <AddTab
        icon={icons.add}
        onClick={onAddTabClick}
        divRef={(r: any) => (store.addTabStore.ref = r)}
      />
      <HorizontalScrollbar
        ref={store.tabsStore.scrollbarRef}
        enabled={store.tabsStore.scrollable}
        visible={store.tabsStore.scrollbarVisible}
        getContainer={getContainer}
      />
    </StyledTabbar>
  );
});

import { observer } from 'mobx-react';
import * as React from 'react';

import HorizontalScrollbar from '../HorizontalScrollbar';
import { Tabs } from '../Tabs';
import store from '~/renderer/store';
import { StyledTabbar, TabsContainer, Indicator } from './style';

const getContainer = () => store.tabsStore.containerRef.current;

const onMouseEnter = () => (store.tabsStore.scrollbarVisible = true);

const onMouseLeave = () => (store.tabsStore.scrollbarVisible = false);

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
      <HorizontalScrollbar
        ref={store.tabsStore.scrollbarRef}
        enabled={store.tabsStore.scrollable}
        visible={store.tabsStore.scrollbarVisible}
        getContainer={getContainer}
      />
    </StyledTabbar>
  );
});

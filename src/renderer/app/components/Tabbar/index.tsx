import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import HorizontalScrollbar from '~/renderer/components/HorizontalScrollbar';
import { icons } from '~/renderer/constants/icons';
import { Tabs } from '../Tabs';
import { AddTab, StyledTabbar, TabsContainer } from './style';

const getContainer = () => store.tabs.containerRef.current;

const onMouseEnter = () => (store.tabs.scrollbarVisible = true);

const onMouseLeave = () => (store.tabs.scrollbarVisible = false);

const onAddTabClick = () => {
  store.tabs.addTab({
    active: true,
  });
};

export const Tabbar = observer(() => {
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
        disabled={false}
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

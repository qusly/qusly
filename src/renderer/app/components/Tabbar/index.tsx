import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import HorizontalScrollbar from '~/renderer/components/HorizontalScrollbar';
import { icons } from '~/renderer/constants/icons';
import Tab from '../Tab';
import { AddTab, StyledTabbar, TabsContainer } from './style';

const Tabs = observer(() => {
  return (
    <>
      {store.tabs.list.map(item => (
        <Tab key={item.id} tab={item} />
      ))}
    </>
  );
});

const getContainer = () => store.tabs.containerRef.current;

const onMouseEnter = () => (store.tabs.scrollbarVisible = true);

const onMouseLeave = () => (store.tabs.scrollbarVisible = false);

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
        size={18}
        onClick={store.addTab.onClick}
        ref={store.addTab.ref}
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

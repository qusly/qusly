import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Tab } from '~/renderer/app/models';
import store from '~/renderer/app/store';
import {
  StyledTab,
  StyledContent,
  StyledTitle,
  StyledClose,
  StyledBorder,
  StyledOverlay,
  TabContainer,
} from './style';

const removeTab = (tab: Tab) => () => {
  tab.close();
};

const onCloseMouseDown = (e: React.MouseEvent) => {
  e.stopPropagation();
};

const onMouseDown = (tab: Tab) => (e: React.MouseEvent) => {
  if (e.button === 0) {
    tab.select();

    store.tabs.lastMouseX = 0;
    store.tabs.isDragging = true;
    store.tabs.mouseStartX = e.pageX;
    store.tabs.tabStartX = tab.left;

    store.tabs.lastScrollLeft = store.tabs.containerRef.current.scrollLeft;
  } else if (e.button === 1) {
    tab.close();
  }
};

const onMouseEnter = (tab: Tab) => () => {
  if (!store.tabs.isDragging) {
    store.tabs.hoveredTabId = tab.id;
  }
};

const onMouseLeave = () => {
  store.tabs.hoveredTabId = -1;
};

const onContextMenu = (tab: Tab) => () => {
  store.contextMenu.focusedTab = tab;
  store.contextMenu.show('tab');
};

const Content = observer(({ tab }: { tab: Tab }) => {
  return (
    <StyledContent collapsed={tab.isExpanded}>
      <StyledTitle style={{ color: 'black' }}>
        {tab.title}
      </StyledTitle>
    </StyledContent>
  );
});

const Close = observer(({ tab }: { tab: Tab }) => {
  return (
    <StyledClose
      onMouseDown={onCloseMouseDown}
      onClick={removeTab(tab)}
      visible={tab.isExpanded}
    />
  );
});

const Border = observer(({ tab }: { tab: Tab }) => {
  return <StyledBorder visible={tab.borderVisible} />;
});

const Overlay = observer(({ tab }: { tab: Tab }) => {
  return (
    <StyledOverlay
      hovered={tab.isHovered}
      style={{
        backgroundColor: tab.isSelected ? 'transparent' : '#f5f5f5',
      }}
    />
  );
});

export default observer(({ tab }: { tab: Tab }) => {
  return (
    <StyledTab
      ref={tab.ref}
      selected={tab.isSelected}
      onMouseDown={onMouseDown(tab)}
      onMouseEnter={onMouseEnter(tab)}
      onMouseLeave={onMouseLeave}
      onContextMenu={onContextMenu(tab)}
    >
      <TabContainer
        style={{
          backgroundColor: tab.isSelected ? '#fff' : 'transparent',
        }}
      >
        <Content tab={tab} />
        <Close tab={tab} />
        <Overlay tab={tab} />
      </TabContainer>
      <Border tab={tab} />
    </StyledTab>
  );
});

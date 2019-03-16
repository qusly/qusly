import { observer } from 'mobx-react';
import * as React from 'react';

import Ripple from '../Ripple';
import { Tab } from '~/renderer/models';
import store from '~/renderer/store';
import { PRIMARY_COLOR } from '~/renderer/constants';
import {
  StyledTab,
  StyledContent,
  StyledTitle,
  StyledClose,
  StyledOverlay,
} from './style';

const removeTab = (tab: Tab) => () => {
  tab.close();
};

const onCloseMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

const onMouseDown = (tab: Tab) => (e: React.MouseEvent<HTMLDivElement>) => {
  const { pageX } = e;

  tab.select();

  store.tabsStore.lastMouseX = 0;
  store.tabsStore.isDragging = true;
  store.tabsStore.mouseStartX = pageX;
  store.tabsStore.tabStartX = tab.left;

  store.tabsStore.lastScrollLeft =
    store.tabsStore.containerRef.current.scrollLeft;
};

const onMouseEnter = (tab: Tab) => () => {
  if (!store.tabsStore.isDragging) {
    store.tabsStore.hoveredTabId = tab.id;
  }
};

const onMouseLeave = () => {
  store.tabsStore.hoveredTabId = -1;
};

const Content = observer(({ tab }: { tab: Tab }) => {
  return (
    <StyledContent hovered={tab.isHovered}>
      <StyledTitle selected={tab.isSelected}>{tab.title}</StyledTitle>
    </StyledContent>
  );
});

const Close = observer(({ tab }: { tab: Tab }) => {
  return (
    <StyledClose
      onMouseDown={onCloseMouseDown}
      onClick={removeTab(tab)}
      visible={tab.isHovered}
    />
  );
});

const Overlay = observer(({ tab }: { tab: Tab }) => {
  return <StyledOverlay hovered={tab.isHovered} />;
});

export default observer(({ tab }: { tab: Tab }) => {
  return (
    <StyledTab
      selected={tab.isSelected}
      hovered={tab.isHovered}
      onMouseDown={onMouseDown(tab)}
      onMouseEnter={onMouseEnter(tab)}
      onMouseLeave={onMouseLeave}
      isClosing={tab.isClosing}
      ref={tab.ref}
    >
      <Content tab={tab} />
      <Close tab={tab} />
      <Overlay tab={tab} />
      <Ripple
        rippleTime={0.6}
        opacity={0.15}
        color={PRIMARY_COLOR}
        style={{ zIndex: 9 }}
      />
    </StyledTab>
  );
});

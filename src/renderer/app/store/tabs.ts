import { ipcRenderer } from 'electron';
import { observable, action } from 'mobx';
import * as React from 'react';
import { TweenLite } from 'gsap';

import store from '.';
import { makeId } from '~/utils';
import { ISite } from '~/interfaces';
import HorizontalScrollbar from '~/renderer/components/HorizontalScrollbar';
import { Tab } from '../models/tab';
import {
  defaultTabOptions,
  TAB_ANIMATION_DURATION,
  TABS_PADDING,
  ADD_TAB_MARGIN_LEFT,
  TAB_ANIMATION_EASING,
} from '../constants/tabs';

export class TabsStore {
  @observable
  public isDragging = false;

  @observable
  public scrollbarVisible = false;

  @observable
  public hoveredTabId: number;

  @observable
  public list: Tab[] = [];

  @observable
  public scrollable = false;

  @observable
  public selectedTabId = 0;

  public removedTabs = 0;

  public lastScrollLeft = 0;
  public lastMouseX = 0;
  public mouseStartX = 0;
  public tabStartX = 0;

  public scrollbarRef = React.createRef<HorizontalScrollbar>();
  public containerRef = React.createRef<HTMLDivElement>();

  private rearrangeTabsTimer = {
    canReset: false,
    time: 0,
    interval: null as any,
  };

  constructor() {
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('resize', this.onResize);

    this.rearrangeTabsTimer.interval = setInterval(() => {
      // Set widths and positions for tabs 3 seconds after a tab was closed
      if (
        this.rearrangeTabsTimer.canReset &&
        this.rearrangeTabsTimer.time === 3
      ) {
        this.removedTabs = 0;
        this.updateTabsBounds(true);
        this.rearrangeTabsTimer.canReset = false;
      }
      this.rearrangeTabsTimer.time++;
    }, 1000);

    if (process.env.ENV === 'dev') {
      requestAnimationFrame(() => {
        if (!this.list.length) {
          const id = makeId(32);

          ipcRenderer.once(`get-testing-site-${id}`, (e, site: ISite) => {
            if (site) this.addTab({ site, active: true });
          });

          ipcRenderer.send('get-testing-site', id);
        }
      });
    }
  }

  public resetRearrangeTabsTimer() {
    this.rearrangeTabsTimer.time = 0;
    this.rearrangeTabsTimer.canReset = true;
  }

  @action
  public onResize = (e: Event) => {
    if (e.isTrusted) {
      this.removedTabs = 0;
      this.updateTabsBounds(false);
    }
  };

  public get containerWidth() {
    if (this.containerRef.current) {
      return this.containerRef.current.offsetWidth;
    }
    return 0;
  }

  public get selectedTab() {
    return this.getTabById(this.selectedTabId);
  }

  public get hoveredTab() {
    return this.getTabById(this.hoveredTabId);
  }

  public getTabById(id: number) {
    return this.list.find(x => x.id === id);
  }

  @action
  public addTab(options = defaultTabOptions) {
    this.removedTabs = 0;

    const tab = new Tab(options);

    if (options.index !== undefined) {
      this.list.splice(options.index, 0, tab);
    } else {
      this.list.push(tab);
    }

    if (options.site) {
      store.pages.add(options.site, tab, options.path);
    }

    requestAnimationFrame(() => {
      tab.setLeft(tab.getLeft(), false);
      this.updateTabsBounds(true);

      this.scrollbarRef.current.scrollToEnd(TAB_ANIMATION_DURATION * 1000);
    });

    return tab;
  }

  public removeTab(id: number) {
    (this.list as any).remove(this.getTabById(id));
  }

  @action
  public updateTabsBounds(animation: boolean) {
    this.setTabsWidths(animation);
    this.setTabsLefts(animation);
  }

  @action
  public setTabsWidths(animation: boolean) {
    const tabs = this.list.filter(x => !x.isClosing);

    const containerWidth = this.containerWidth;

    for (const tab of tabs) {
      const width = tab.getWidth(containerWidth, tabs);
      tab.setWidth(width, animation);

      this.scrollable = width === 72;
    }
  }

  @action
  public setTabsLefts(animation: boolean) {
    const tabs = this.list.filter(x => !x.isClosing);

    let left = 0;

    for (const tab of tabs) {
      tab.setLeft(left, animation);

      left += tab.width + TABS_PADDING;
    }

    store.addTab.setLeft(
      Math.min(
        left + ADD_TAB_MARGIN_LEFT,
        this.containerWidth + TABS_PADDING + ADD_TAB_MARGIN_LEFT,
      ),
      animation,
    );
  }

  @action
  public replaceTab(firstTab: Tab, secondTab: Tab) {
    secondTab.setLeft(firstTab.getLeft(true), true);

    const index = this.list.indexOf(secondTab);

    this.list[this.list.indexOf(firstTab)] = secondTab;
    this.list[index] = firstTab;
  }

  public getTabsToReplace(callingTab: Tab, direction: string) {
    const tabs = this.list;

    const index = tabs.indexOf(callingTab);

    if (direction === 'left') {
      for (let i = index - 1; i >= 0; i--) {
        const tab = tabs[i];
        if (callingTab.left <= tab.width / 2 + tab.left) {
          this.replaceTab(tabs[i + 1], tab);
        } else {
          break;
        }
      }
    } else if (direction === 'right') {
      for (let i = index + 1; i < tabs.length; i++) {
        const tab = tabs[i];
        if (callingTab.left + callingTab.width >= tab.width / 2 + tab.left) {
          this.replaceTab(tabs[i - 1], tab);
        } else {
          break;
        }
      }
    }
  }

  @action
  public onMouseUp = () => {
    const selectedTab = this.selectedTab;

    this.isDragging = false;

    this.setTabsLefts(true);

    if (selectedTab) {
      selectedTab.isDragging = false;
    }
  };

  @action
  public onMouseMove = (e: any) => {
    const { selectedTab } = store.tabs;

    if (this.isDragging) {
      const container = this.containerRef;
      const { tabStartX, mouseStartX, lastMouseX, lastScrollLeft } = store.tabs;

      if (Math.abs(e.pageX - mouseStartX) < 5) {
        return;
      }

      selectedTab.isDragging = true;

      const newLeft =
        tabStartX +
        e.pageX -
        mouseStartX -
        (lastScrollLeft - container.current.scrollLeft);

      let left = Math.max(0, newLeft);

      if (
        newLeft + selectedTab.width >
        store.addTab.left + container.current.scrollLeft - TABS_PADDING
      ) {
        left =
          store.addTab.left - selectedTab.width + lastScrollLeft - TABS_PADDING;
      }

      selectedTab.setLeft(left, false);

      this.getTabsToReplace(
        selectedTab,
        lastMouseX - e.pageX >= 1 ? 'left' : 'right',
      );

      this.lastMouseX = e.pageX;
    }
  };

  public animateProperty(
    property: string,
    obj: any,
    value: number,
    animation: boolean,
  ) {
    if (obj) {
      const props: any = {
        ease: animation ? TAB_ANIMATION_EASING : null,
      };
      props[property] = value;
      TweenLite.to(obj, animation ? TAB_ANIMATION_DURATION : 0, props);
    }
  }

  public get previousTab() {
    const index = this.list.indexOf(this.selectedTab);
    if (index - 1 === -1) return null;
    return this.list[index - 1];
  }

  public get nextTab() {
    const index = this.list.indexOf(this.selectedTab);
    if (index + 1 >= this.list.length) return null;
    return this.list[index + 1];
  }
}

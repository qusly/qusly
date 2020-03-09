import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { ISidebarContent } from '../../store/sidebar';
import Explorer from './Explorer';
import { StyledSidebar } from './style';

interface IPageProps {
  content: ISidebarContent;
  children?: any;
}

export const SidebarPage = observer(({ content, children }: IPageProps) => {
  return store.sidebar.content === content ? children : undefined;
});

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <Explorer />
    </StyledSidebar>
  );
};

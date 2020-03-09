import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { ISidebarContent } from '../../store/sidebar';
import Explorer from './Explorer';
import { StyledSidebar } from './style';

interface IContentProps {
  content: ISidebarContent;
  children?: any;
}

export const SidebarContent = observer(
  ({ content, children }: IContentProps) => {
    return store.sidebar.content === content ? children : undefined;
  },
);

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <Explorer />
    </StyledSidebar>
  );
};

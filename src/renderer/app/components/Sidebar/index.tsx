import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { SidebarContent } from '~/renderer/app/store/activitybar';
import { Explorer } from './Explorer';
import { StyledSidebar, StyledPage, Title } from './style';

interface PageProps {
  title: string;
  content: SidebarContent;
  children?: any;
}

export const Page = observer(({ title, content, children }: PageProps) => {
  return (
    <StyledPage visible={store.activitybar.content === content}>
      <Title>{title}</Title>
      {children}
    </StyledPage>
  )
});

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <Explorer />
    </StyledSidebar>
  );
}

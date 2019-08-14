import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { SidebarContent } from '~/renderer/app/store/activitybar';
import { StyledSidebar, StyledPage, Title } from './style';

interface PageProps {
  title: string;
  content: SidebarContent;
  children?: any;
}

const Page = observer(({ title, content, children }: PageProps) => {
  return (
    <StyledPage visible={store.activitybar.content === content}>
      <Title>{title}</Title>
      {children}
    </StyledPage>
  )
});

const Explorer = () => {
  return (
    <Page title='Explorer' content='explorer' />
  );
}

const SitesManager = () => {
  return (
    <Page title='Sites manager' content='sites-manager' />
  );
}

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <Explorer />
      <SitesManager />
    </StyledSidebar>
  );
}

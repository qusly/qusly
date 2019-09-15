import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Resizable } from 'resizable-box';

import store from '~/renderer/app/store';
import { SidebarContent } from '~/renderer/app/store/activitybar';
import { Explorer } from './Explorer';
import { StyledSidebar, StyledPage, Title, Content } from './style';

interface PageProps {
  title: string;
  content: SidebarContent;
  children?: any;
}

export const Page = observer(({ title, content, children }: PageProps) => {
  return (
    <StyledPage visible={store.activitybar.content === content}>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </StyledPage>
  )
});

export const Sidebar = () => {
  return (
    <Resizable direction='right' defaultSize={256} minSize={128} maxSize={512} style={{ height: '100%' }}>
      <StyledSidebar>
        <Explorer />
      </StyledSidebar>
    </Resizable >
  );
}

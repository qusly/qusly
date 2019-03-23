import * as React from 'react';
import { observer } from 'mobx-react';

import { Header } from '../Header';
import store from '~/renderer/store';
import { StyledContainer } from './styles';
import { Folder } from '../Folder';
import { File } from '../File';

export const Content = observer(() => {
  const { navDrawerStore, infoPanelStore } = store;

  const width = navDrawerStore.width + infoPanelStore.width;

  const style = {
    width: `calc(100vw - ${width}px)`,
    marginLeft: navDrawerStore.width,
  };

  return (
    <StyledContainer style={style}>
      <Header>Folders</Header>
      <Folder>First folder</Folder>
      <Folder>Second folder</Folder>
      <Header style={{ marginTop: 16 }}>Files</Header>
      <File image="https://cdn.dogtownmedia.com/wp-content/uploads/2016/06/12194056/material-design-android-app-developer.jpg">
        wallpaper.jpg
      </File>
      <File image="https://htmlcolors.com/gradients-images/56-purple-orange-gradient.jpg">
        40e78bf7a2e490456rww1w1541.png
      </File>
      <File icon="https://avocode.com/static/icons/integrations/visual-studio-code.svg?ver=1">
        index.ts
      </File>
    </StyledContainer>
  );
});

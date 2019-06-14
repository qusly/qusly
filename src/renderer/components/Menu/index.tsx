import * as React from 'react';

import { icons } from '~/renderer/constants/icons';
import Resizable from '../Resizable';
import MenuButton from '../MenuButton';
import MenuPage from '../MenuPage';
import FileTree from '../FileTree';
import SiteManager from '../SiteManager';
import { ButtonsBar, Container } from './styles';

const Buttons = () => {
  return (
    <ButtonsBar>
      <MenuButton page="file-tree" icon={icons.fileTree} />
      <MenuButton page="transfer" icon={icons.fileOutline} />
      <MenuButton page="search" icon={icons.search} />
      <MenuButton page="site-manager" icon={icons.siteManager} />
    </ButtonsBar>
  );
};

const Pages = () => {
  return (
    <React.Fragment>
      <MenuPage page="file-tree">
        <FileTree />
      </MenuPage>
      <MenuPage page="site-manager">
        <SiteManager />
      </MenuPage>
    </React.Fragment>
  );
};

export default () => {
  return (
    <React.Fragment>
      <Buttons />
      <Resizable>
        <Container>
          <Pages />
        </Container>
      </Resizable>
    </React.Fragment>
  );
};

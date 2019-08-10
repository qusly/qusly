import * as React from 'react';

import { icons } from '~/renderer/constants/icons';
import Resizable from '../Resizable';
import { MenuButton } from '../MenuButton';
import MenuPage from '../MenuPage';
import FileTree from '../FileTree';
import SitesManager from '../SitesManager';
import TransferView from '../TransferView';
import { ButtonsBar } from './styles';

const Buttons = () => {
  return (
    <ButtonsBar>
      <MenuButton content="sites" icon={icons.sitesManager} />
      <MenuButton content="file-tree" icon={icons.fileTree} />
      <MenuButton content="search" icon={icons.search} />
      <MenuButton content="transfers" icon={icons.transfer} iconSize={26} disabled />
    </ButtonsBar>
  );
};

export default () => {
  return (
    <>
      <Buttons />
      <Resizable>
        <MenuPage content="file-tree">
          <FileTree />
        </MenuPage>
        <MenuPage content="sites">
          <SitesManager />
        </MenuPage>
        <MenuPage content="transfers">
          <TransferView />
        </MenuPage>
      </Resizable>
    </>
  );
};

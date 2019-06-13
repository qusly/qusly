import * as React from 'react';
import { observer } from 'mobx-react';

import Resizable from '../Resizable';
import FileTree from '../FileTree';
import store from '~/renderer/store';
import { MENU_PAGE, icons } from '~/renderer/constants';
import SiteView from '../SiteView';
import {
  Container,
  StyledButton,
  Icon,
  StyledButtons,
  StyledItem,
} from './styles';

const onClick = (page: MENU_PAGE) => () => {
  store.menu.selected = page;
};

export const Button = observer(
  ({ page, icon }: { page: MENU_PAGE; icon: any }) => {
    return (
      <StyledButton onClick={onClick(page)}>
        <Icon icon={icon} selected={store.menu.selected === page} />
      </StyledButton>
    );
  },
);

export const Item = observer(
  ({ children, page }: { children?: any; page: MENU_PAGE }) => {
    return (
      <StyledItem visible={store.menu.selected === page}>{children}</StyledItem>
    );
  },
);

export const Buttons = () => {
  return (
    <StyledButtons>
      <Button page="tree" icon={icons.fileTree} />
      <Button page="transfer" icon={icons.fileOutline} />
      <Button page="search" icon={icons.search} />
      <Button page="sites" icon={icons.siteManager} />
    </StyledButtons>
  );
};

export default () => {
  const style = {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  };

  return (
    <React.Fragment>
      <Buttons />
      <Resizable style={style}>
        <Container>
          <Item page="tree">
            <FileTree />
          </Item>
          <Item page="sites">
            <SiteView />
          </Item>
        </Container>
      </Resizable>
    </React.Fragment>
  );
};

import * as React from 'react';
import { observer } from 'mobx-react';

import Resizable from '../Resizable';
import FileTree from '../FileTree';
import store from '~/renderer/store';
import { MENU_PAGE, icons } from '~/renderer/constants';
import { Container, StyledButton, StyledButtons } from './styles';

const onClick = (page: MENU_PAGE) => () => {
  store.menu.selected = page;
};

export const Button = observer(
  ({ page, icon }: { page: MENU_PAGE; icon: any }) => {
    return (
      <StyledButton
        icon={icon}
        selected={store.menu.selected === page}
        onClick={onClick(page)}
      />
    );
  },
);

export const Buttons = () => {
  return (
    <StyledButtons>
      <Button page="tree" icon={icons.fileTree} />
      <Button page="transfer" icon={icons.fileMultiple} />
      <Button page="search" icon={icons.search} />
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
          <FileTree />
        </Container>
      </Resizable>
    </React.Fragment>
  );
};

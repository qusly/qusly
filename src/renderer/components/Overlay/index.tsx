import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import Dialog from '../Dialog';
import { StyledOverlay } from './styles';

const onClick = () => store.overlay.hide();

export default observer(() => {
  return (
    <StyledOverlay visible={store.overlay.visible} onClick={onClick}>
      <Dialog title="Add new site" type="add-site">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
        maiores et est nostrum quibusdam expedita autem neque, ullam id quisquam
        placeat unde deserunt obcaecati rerum eligendi distinctio aperiam quo
        blanditiis.
      </Dialog>
    </StyledOverlay>
  );
});

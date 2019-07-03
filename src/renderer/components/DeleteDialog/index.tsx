import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { CloseButton, Dialog, Title, Content, Buttons } from '../Dialog';
import { Button } from '../Button';

requestAnimationFrame(() => {
  store.overlay.content = 'delete';
});

export default observer(() => {
  return (
    <Dialog visible={store.overlay.content === 'delete'} style={{ width: 344 }}>
      <Title>Delete file</Title>
      <Content>xdd</Content>
      <Buttons>
        <CloseButton />
        <Button background="transparent" foreground="#3F51B5">
          DELETE
        </Button>
      </Buttons>
    </Dialog>
  );
});

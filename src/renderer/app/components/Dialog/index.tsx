import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { DialogContent } from '~/renderer/app/store/dialog';
import { SiteDialog } from './Site';
import { StyledDialog, DialogButton, Dark, Container } from './style';

const onClose = () => {
  store.dialog.visible = false;
}

export const DialogContainer = observer(({ content, children }: { content: DialogContent | DialogContent[], children: any }) => {
  const current = store.dialog.content;
  const contentVisible = content instanceof Array ? content.indexOf(current) !== -1 : content === current;

  return (
    <Container visible={store.dialog.visible && contentVisible}>
      {children}
    </Container>
  );
});

export const CloseButton = () => {
  return <DialogButton label='Cancel' background='rgba(0, 0, 0, 0.08)' color='#000' onClick={onClose} />;
}

export const Dialog = observer(() => {
  return (
    <StyledDialog visible={store.dialog.visible}>
      <Dark onClick={onClose} />
      <SiteDialog />
    </StyledDialog>
  );
});

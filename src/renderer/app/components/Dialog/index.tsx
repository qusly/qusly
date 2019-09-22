import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { DialogContent } from '~/renderer/app/store/dialog';
import { AddSite } from './AddSite';
import { StyledDialog, Container, DialogButton } from './style';

const onClose = () => {
  store.dialog.content = null;
}

export const DialogContainer = observer(({ content, children }: { content: DialogContent, children: any }) => {
  return store.dialog.content === content && children;
});

export const CloseButton = () => {
  return <DialogButton label='Cancel' background='rgba(0, 0, 0, 0.08)' color='#000' onClick={onClose} />;
}

export const Dialog = observer(() => {
  return (
    <StyledDialog>
      <Container>
        <AddSite />
      </Container>
    </StyledDialog>
  );
});

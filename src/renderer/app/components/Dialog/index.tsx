import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { AddSite } from './AddSite';
import { StyledDialog, DialogButton, Dark } from './style';

const onClose = () => {
  store.dialog.hide();
}

export const CloseButton = () => {
  return <DialogButton label='Cancel' background='rgba(0, 0, 0, 0.08)' color='#000' onClick={onClose} />;
}

export const Dialog = observer(() => {
  const visible = !!store.dialog.content;

  return (
    <StyledDialog visible={visible}>
      <Dark visible={visible} onClick={onClose} />
      <AddSite />
    </StyledDialog>
  );
});

import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { AddSite } from './AddSite';
import { StyledDialog, DialogButton } from './style';

const onClose = () => {
  store.dialog.content = null;
}

export const CloseButton = () => {
  return <DialogButton label='Cancel' background='rgba(0, 0, 0, 0.08)' color='#000' onClick={onClose} />;
}

export const Dialog = observer(() => {
  return (
    <StyledDialog visible={!!store.dialog.content}>
      <AddSite />
    </StyledDialog>
  );
});

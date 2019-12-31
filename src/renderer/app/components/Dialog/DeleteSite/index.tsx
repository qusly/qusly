import * as React from 'react';

import store from '~/renderer/app/store';
import { DialogContainer, SecondaryButton, onDialogClose } from '..';
import { Title, Content, Buttons, DialogButton } from '../style';

const onDelete = () => {
  const { _id } = store.contextMenu.focusedSite;

  store.sites.remove(_id);
  store.dialog.visible = false;
};

export const DeleteSiteDialog = () => {
  return (
    <DialogContainer content="delete-site">
      <Title>Confirm</Title>
      <Content>Are you sure you want to delete this bookmark?</Content>
      <Buttons>
        <SecondaryButton label="Delete" onClick={onDelete} />
        <DialogButton label="Cancel" onClick={onDialogClose} />
      </Buttons>
    </DialogContainer>
  );
};

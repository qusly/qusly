import React from 'react';

import { DialogContainer } from '..';
import { Title, DialogButtons } from '../style';

export const RenameFileDialog = () => {
  return (
    <DialogContainer content="rename-file">
      <Title>Change name</Title>
      <DialogButtons>test</DialogButtons>
    </DialogContainer>
  );
};

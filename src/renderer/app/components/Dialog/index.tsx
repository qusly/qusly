import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { IDialogContent } from '../../store/dialog';
import { RenameFileDialog } from './RenameFile';
import { Background, StyledDialog } from './style';

export const DialogContainer = observer(
  ({ content, children }: { content: IDialogContent; children: any }) => {
    const selected = store.dialog.content === content;
    return selected && children;
  },
);

export const Dialog = observer(() => {
  const onBackgroundClick = React.useCallback(() => {
    store.dialog.visible = false;
  }, []);

  const onClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <Background visible={store.dialog.visible} onClick={onBackgroundClick}>
      <StyledDialog onClick={onClick}>
        {store.dialog.visible && (
          <>
            <RenameFileDialog />
          </>
        )}
      </StyledDialog>
    </Background>
  );
});

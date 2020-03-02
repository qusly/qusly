import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { StyledPathView, Folders, StyledFolder, Input } from './style';

const Folder = ({ label, index }: { label: string; index: number }) => {
  const onMouseUp = React.useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;

      const page = store.pages.current;

      if (!page.isDragging) {
        store.pages.current.history.goToFolder(index);
      } else {
        const path = page.history.folderPath(index);

        page.files.move(page.files.selected, path);
      }
    },
    [index],
  );

  return (
    <StyledFolder onMouseUp={onMouseUp} onMouseDown={e => e.stopPropagation()}>
      {label}
    </StyledFolder>
  );
};

export const PathView = observer(() => {
  const page = store.pages.current;
  const folders = page?.history.folders;

  const visible = store.pathView.visible;

  return (
    <StyledPathView
      onMouseDown={store.pathView.onMouseDown}
      onContextMenu={store.pathView.onContextMenu}
      inputVisible={visible}
    >
      {folders && (
        <Folders>
          {folders.map((r, index) => (
            <Folder key={r} label={r} index={index} />
          ))}
        </Folders>
      )}
      <Input
        ref={store.pathView.ref}
        visible={visible}
        onBlur={store.pathView.hide}
        onKeyDown={store.pathView.onKeyDown}
      />
    </StyledPathView>
  );
});

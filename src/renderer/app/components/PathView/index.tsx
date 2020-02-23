import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { StyledPathView, Folders, Folder } from './style';

const onFolderMouseUp = (index: number) => (e: React.MouseEvent) => {
  if (e.button !== 0) return;

  const page = store.pages.current;

  if (!page.isDragging) {
    store.pages.current.history.goToFolder(index);
  } else {
    const path = page.history.folderPath(index);

    page.files.move(page.files.selected, path);
  }
};

export const PathView = observer(() => {
  const page = store.pages.current;
  const folders = page?.history.folders;

  return (
    <StyledPathView>
      {folders && (
        <Folders>
          {folders.map((r, index) => (
            <Folder key={r} onMouseUp={onFolderMouseUp(index)}>
              {r}
            </Folder>
          ))}
        </Folders>
      )}
    </StyledPathView>
  );
});

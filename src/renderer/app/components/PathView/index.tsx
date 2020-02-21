import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { StyledPathView, Folders, Folder } from './style';

const onFolderClick = (index: number) => () => {
  store.pages.current.history.goToFolder(index);
};

export const PathView = observer(() => {
  const page = store.pages.current;
  const folders = page?.history.folders;

  return (
    <StyledPathView>
      {folders && (
        <Folders>
          {folders.map((r, index) => (
            <Folder key={r} onClick={onFolderClick(index)}>
              {r}
            </Folder>
          ))}
        </Folders>
      )}
    </StyledPathView>
  );
});

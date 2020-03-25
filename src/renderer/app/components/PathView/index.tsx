import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { Folder } from './Folder';
import { StyledPathView, Folders, Input } from './style';

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
            <Folder
              key={r}
              label={r}
              index={index}
              last={index === folders.length - 1}
            />
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

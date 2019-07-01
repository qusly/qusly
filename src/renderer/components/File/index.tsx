import * as React from 'react';
import { observer } from 'mobx-react';
import { IFileType } from 'qusly-core';

import store from '~/renderer/store';
import { File } from '~/renderer/models';
import { resizeTextarea } from '~/renderer/utils';
import { StyledFile, Icon, Label, Input } from './styles';

const onClick = (file: File) => (e: React.MouseEvent) => {
  if (e.ctrlKey) {
    file.selected = true;
  } else if (e.shiftKey) {
    selectGroup(file);
  } else {
    store.pages.current.focusFile(file);
  }
};

const onDoubleClick = (type: IFileType, name: string) => () => {
  if (type === 'directory') {
    store.pages.current.location.push(name);
  }
};

const onContextMenu = (file: File) => (e: React.MouseEvent) => {
  e.stopPropagation();

  if (file.renaming) return;

  if (!file.selected) {
    store.pages.current.focusFile(file);
  }

  store.contextMenu.show('file', e);
};

const onInputKey = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.stopPropagation();
    e.preventDefault();
    rename();
  }

  resizeTextarea(e.target as HTMLTextAreaElement);
};

const onInputClick = (e: React.MouseEvent) => {
  e.stopPropagation();
};

const selectGroup = (file: File) => {
  const page = store.pages.current;
  const fileIndex = page.files.indexOf(file);
  const focusedFileIndex = page.files.indexOf(page.focusedFile);

  const bigger = fileIndex >= focusedFileIndex;

  const start = bigger ? focusedFileIndex : fileIndex;
  const end = !bigger ? focusedFileIndex : fileIndex;

  for (let i = 0; i < page.files.length; i++) {
    page.files[i].selected = i >= start && i <= end;
  }
};

const rename = () => {
  const page = store.pages.current;
  const file = page.focusedFile;

  page.rename(file, file.nameInput.value);
};

export default observer(({ data }: { data: File }) => {
  const { name, type, selected, renaming } = data;
  const { icon, opacity } = store.favicons.get(data);

  return (
    <StyledFile
      onClick={onClick(data)}
      onDoubleClick={onDoubleClick(type, name)}
      selected={selected}
      onContextMenu={onContextMenu(data)}
    >
      <Icon icon={icon} style={{ opacity }} />
      {!renaming && <Label>{name}</Label>}
      <Input
        ref={r => (data.nameInput = r)}
        onKeyDown={onInputKey}
        onMouseDown={onInputClick}
        onDoubleClick={onInputClick}
        onBlur={rename}
        style={{ display: renaming ? 'block' : 'none' }}
      />
    </StyledFile>
  );
});

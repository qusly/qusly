import * as React from 'react';
import { observer } from 'mobx-react';
import { IFile, IFileType } from 'qusly-core';

import store from '~/renderer/store';
import { StyledFile, Icon, Label } from './styles';

const onDoubleClick = (type: IFileType, name: string) => () => {
  if (type !== 'directory') return;

  const page = store.pages.current;
  page.location.push(name);
};

const selectFile = (file: IFile) => {
  const page = store.pages.current;
  const index = page.selectedFiles.indexOf(file);

  if (index === -1) {
    page.selectedFiles.push(file);
  } else {
    page.selectedFiles.splice(index, 1);
  }
};

const focusFile = (file: IFile) => {
  const page = store.pages.current;

  page.selectedFiles = [file];
  page.focusedFile = file;
};

const selectGroup = (file: IFile) => {
  const page = store.pages.current;
  const index = page.files.indexOf(file);
  const focusedIndex = page.files.indexOf(page.focusedFile);

  if (index > focusedIndex) {
    page.selectedFiles = page.files.slice(focusedIndex, index + 1);
  } else {
    page.selectedFiles = page.files.slice(index, focusedIndex + 1);
  }
};

const onClick = (file: IFile) => (e: React.MouseEvent) => {
  if (e.ctrlKey) {
    selectFile(file);
  } else if (e.shiftKey) {
    selectGroup(file);
  } else {
    focusFile(file);
  }
};

const onContextMenu = (file: IFile) => (e: React.MouseEvent) => {
  const page = store.pages.current;

  if (page.selectedFiles.indexOf(file) === -1) {
    page.selectedFiles = [file];
    page.focusedFile = file;
  }

  store.fileMenu.show(e);
};

export default observer(
  ({ data, selected }: { data: IFile; selected: boolean }) => {
    const { name, type } = data;
    const { icon, opacity } = store.favicons.get(data);

    return (
      <StyledFile
        onClick={onClick(data)}
        onDoubleClick={onDoubleClick(type, name)}
        selected={selected}
        onContextMenu={onContextMenu(data)}
      >
        <Icon icon={icon} style={{ opacity }} />
        <Label>{name}</Label>
      </StyledFile>
    );
  },
);

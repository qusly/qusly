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

const onClick = (name: string) => (e: React.MouseEvent) => {
  const page = store.pages.current;

  if (e.ctrlKey) {
    const index = page.selectedFiles.indexOf(name);
    if (index === -1) {
      page.selectedFiles.push(name);
    } else {
      page.selectedFiles.splice(index, 1);
    }
  } else if (e.shiftKey) {
    const index = page.files.findIndex(e => e.name === name);
    const focusedIndex = page.files.findIndex(e => e.name === page.focusedFile);

    let items: IFile[];

    if (index > focusedIndex) {
      items = page.files.slice(focusedIndex, index + 1);
    } else {
      items = page.files.slice(index, focusedIndex + 1);
    }

    page.selectedFiles = items.map(e => e.name);
  } else {
    page.selectedFiles = [name];
    page.focusedFile = name;
  }
};

const onContextMenu = (name: string) => (e: React.MouseEvent) => {
  store.pages.current.focusedFile = name;
  store.fileMenu.show(e);
};

export default observer(
  ({ data, selected }: { data: IFile; selected: boolean }) => {
    const { name, type } = data;
    const { icon, opacity } = store.favicons.get(data);

    return (
      <StyledFile
        onClick={onClick(name)}
        onDoubleClick={onDoubleClick(type, name)}
        selected={selected}
        onContextMenu={onContextMenu(name)}
      >
        <Icon icon={icon} style={{ opacity }} />
        <Label>{name}</Label>
      </StyledFile>
    );
  },
);

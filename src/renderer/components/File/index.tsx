import * as React from 'react';
import { observer } from 'mobx-react';
import { IFile, IFileType } from 'qusly-core';

import store from '~/renderer/store';
import { StyledFile, Icon, Label } from './styles';

const onDoubleClick = (type: IFileType, name: string) => () => {
  if (type !== 'directory') return;

  const page = store.pages.current;

  page.location.push(name);
  page.fetchFiles();
};

const onClick = (name: string) => (e: React.KeyboardEvent<HTMLDivElement>) => {
  const page = store.pages.current;

  if (e.ctrlKey) {
    const index = page.selectedFiles.indexOf(name);
    if (index === -1) {
      page.selectedFiles.push(name);
    } else {
      page.selectedFiles.splice(index, 1);
    }
  } else {
    page.selectedFiles = [name];
  }
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
      >
        <Icon icon={icon} style={{ opacity }} />
        <Label>{name}</Label>
      </StyledFile>
    );
  },
);

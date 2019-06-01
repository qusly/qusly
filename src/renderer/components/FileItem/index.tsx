import * as React from 'react';
import { observer } from 'mobx-react';
import { IFile, IFileType } from 'qusly-core';

import store from '~/renderer/store';
import { StyledFileItem, Icon, Label } from './styles';

const onClick = (type: IFileType, name: string) => () => {
  if (type !== 'directory') return;

  const page = store.pages.current;

  page.pathItems.push(name);
  page.fetchFiles();
};

export default observer(({ data }: { data: IFile }) => {
  const { name, type } = data;
  const { icon, opacity } = store.icons.get(data);

  return (
    <StyledFileItem onClick={onClick(type, name)}>
      <Icon icon={icon} style={{ opacity }} />
      <Label>{name}</Label>
    </StyledFileItem>
  );
});

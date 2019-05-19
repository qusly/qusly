import * as React from 'react';
import { observer } from 'mobx-react';
import { File, FileType } from 'qusly-core';

import { icons, transparency } from '~/renderer/constants';
import store from '~/renderer/store';
import { StyledFileItem, Icon, Label } from './styles';

const onClick = ({ name, type }: File) => () => {
  if (type === FileType.Directory && store.session.status === 'ok') {
    store.session.path.push(name);
    store.session.loadFiles();
  }
};

export default observer(({ data }: { data: File }) => {
  const { type, name, ext } = data;
  const isDirectory = type === FileType.Directory;

  let icon = icons.file;
  let opacity = transparency.icons.inactive;

  if (isDirectory) {
    icon = icons.folder;
  } else if (ext !== '' && store.extIcons[ext] != null) {
    icon = store.extIcons[ext];
    opacity = 1;
  }

  return (
    <StyledFileItem onClick={onClick(data)}>
      <Icon icon={icon} style={{ opacity }} />
      <Label>{name}</Label>
    </StyledFileItem>
  );
});

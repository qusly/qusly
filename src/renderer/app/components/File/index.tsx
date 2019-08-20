import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { selectableItem } from 'rectangle-selection';

import store from '~/renderer/app/store';
import { handleSelection } from '~/renderer/app/utils';
import { IFile } from '~/interfaces';
import { StyledFile, Label, Icon } from './style';

interface Props {
  data: IFile;
}

const onMouseDown = (data: IFile) => (e: React.MouseEvent) => {
  e.stopPropagation();
  handleSelection(data, e);
}

const onDoubleClick = (data: IFile) => () => {
  const page = store.pages.current;

  if (data.type === 'directory') {
    page.path.pushRelative(data.name);
    page.fetchFiles();
  }
}

export const File = selectableItem<Props>(observer(({ data }: Props) => {
  const { name, selected } = data;
  const { icon, opacity } = store.icons.getIcon(data);

  return (
    <StyledFile
      onMouseDown={onMouseDown(data)}
      onDoubleClick={onDoubleClick(data)}
      selected={selected}
      cut={false}
      disabled={false}>
      <Icon icon={icon} style={{ opacity }} />
      <Label>{name}</Label>
    </StyledFile>
  );
}));


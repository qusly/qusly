import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { selectableItem } from 'rectangle-selection';

import store from '~/renderer/app/store';
import { IFile } from '~/interfaces';
import { StyledFile, Label, Icon } from './style';

interface Props {
  data: IFile;
}

const onMouseDown = (data: IFile) => (e: React.MouseEvent) => {
  e.stopPropagation();

  if (e.button !== 1 && e.button !== 2) {
    const page = store.pages.current;
    const { selected } = data;

    if (e.ctrlKey) {
      data.selected = !selected;
    } else if (e.shiftKey) {
      page.selectGroup(page.files.indexOf(data), page.files.indexOf(page.focusedFile));
    } else {
      page.unselectFiles();
      data.selected = true;
    }

    if (!e.shiftKey) {
      page.focusedFile = data;
    }
  }
}

const onDoubleClick = (data: IFile) => () => {
  const page = store.pages.current;

  if (data.type === 'directory') {
    page.path.pushRelative(data.name);
  }
}

export const File = selectableItem<Props>(observer(({ data }: Props) => {
  const { name, selected } = data;
  const { icon, opacity } = store.icons.getIcon(data);

  return (
    <StyledFile
      onMouseDown={onMouseDown(data)}
      onClick={e => e.stopPropagation()}
      onDoubleClick={onDoubleClick(data)}
      selected={selected}
      cut={false}
      disabled={false}>
      <Icon icon={icon} style={{ opacity }} />
      <Label>{name}</Label>
    </StyledFile>
  );
}));


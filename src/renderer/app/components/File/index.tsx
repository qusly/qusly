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

  if (e.button === 0) {
    const page = store.pages.current;
    const { selected } = data;

    if (e.ctrlKey) {
      data.selected = !selected;
    } else if (e.shiftKey) {
      page.selectGroup(page.files.indexOf(data), page.files.indexOf(page.focusedFile));
    } else if (!data.selected) {
      page.unselectFiles(data);
    }

    if (!e.shiftKey) {
      page.focusedFile = data;
    }

    store.drag.active = true;
    store.drag.startPos = {
      top: e.pageY,
      left: e.pageX,
    }
  }

  store.contextMenu.visible = false;
}

const onDoubleClick = (data: IFile) => () => {
  if (data.type === 'directory') {
    store.pages.current.path.pushRelative(data.name);
  }
}

const onMouseEnter = (data: IFile) => () => {
  store.pages.current.hoveredFile = data;
}

const onMouseLeave = (data: IFile) => () => {
  store.pages.current.hoveredFile = null;
}

const onClick = (data: IFile) => (e: React.MouseEvent) => {
  e.stopPropagation();
  store.drag.hide();

  if (!e.shiftKey && !e.ctrlKey) {
    store.pages.current.unselectFiles(data);
  }
}

export const File = selectableItem<Props>(observer(({ data }: Props) => {
  const { name, selected } = data;
  const { icon, opacity } = store.icons.getIcon(data);

  return (
    <StyledFile
      onMouseEnter={onMouseEnter(data)}
      onMouseLeave={onMouseLeave(data)}
      onMouseDown={onMouseDown(data)}
      onClick={onClick(data)}
      onDoubleClick={onDoubleClick(data)}
      selected={selected}
      cut={false}
      disabled={false}>
      <Icon icon={icon} style={{ opacity }} />
      <Label>{name}</Label>
    </StyledFile>
  );
}));


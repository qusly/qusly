import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { selectableItem } from 'rectangle-selection';

import store from '~/renderer/app/store';
import { IFile } from '~/interfaces';
import { StyledFile, Label, Icon, Input } from './style';
import { resizeTextarea, selectFileName } from '../../utils/input';

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
      page.selectGroup(
        page.files.indexOf(data),
        page.files.indexOf(page.focusedFile),
      );
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
    };
  }

  store.contextMenu.visible = false;
};

const onDoubleClick = (data: IFile) => () => {
  if (data.type === 'folder') {
    store.pages.current.path.pushRelative(data.name);
  }
};

const onMouseEnter = (data: IFile) => () => {
  store.pages.current.hoveredFile = data;
};

const onMouseLeave = () => {
  store.pages.current.hoveredFile = null;
};

const onClick = (data: IFile) => (e: React.MouseEvent) => {
  e.stopPropagation();
  store.drag.hide();

  if (!e.shiftKey && !e.ctrlKey) {
    store.pages.current.unselectFiles(data);
  }
};

const onContextMenu = (data: IFile) => (e: React.MouseEvent) => {
  e.stopPropagation();

  const page = store.pages.current;
  const selectedFiles = page.selectedFiles;

  if (selectedFiles.indexOf(data) === -1) {
    page.unselectFiles(data);
  }

  page.focusedFile = data;
  store.contextMenu.show('file');
};

const onInputKeyDown = (data: IFile) => (e: React.KeyboardEvent) => {
  const input = e.target as HTMLTextAreaElement;

  if (e.key === 'Enter') {
    e.stopPropagation();
    e.preventDefault();
    store.pages.current.rename(data, input.value);
  } else {
    resizeTextarea(input);
  }
};

const onInputBlur = (data: IFile) => (
  e: React.FocusEvent<HTMLTextAreaElement>,
) => {
  if (data.renamed) {
    store.pages.current.rename(data, e.target.value);
    data.renamed = false;
  }
};

export const File = selectableItem<Props>(
  observer(({ data }: Props) => {
    const inputRef = React.useRef<HTMLTextAreaElement>();
    const { name, selected, renamed, cut } = data;
    const { icon, opacity } = store.icons.getIcon(data);

    React.useEffect(() => {
      if (renamed) {
        const input = inputRef.current;

        input.value = name;
        input.focus();

        selectFileName(input);
        resizeTextarea(input);
      }
    }, [renamed]);

    return (
      <StyledFile
        onMouseEnter={onMouseEnter(data)}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown(data)}
        onClick={onClick(data)}
        onDoubleClick={onDoubleClick(data)}
        onContextMenu={onContextMenu(data)}
        selected={selected}
        cut={cut}
      >
        <Icon icon={icon} style={{ opacity }} />
        <Label>{name}</Label>
        <Input
          ref={inputRef}
          visible={renamed}
          onKeyDown={onInputKeyDown(data)}
          onMouseDown={e => e.stopPropagation()}
          onDoubleClick={e => e.stopPropagation()}
          onBlur={onInputBlur(data)}
        />
      </StyledFile>
    );
  }),
);

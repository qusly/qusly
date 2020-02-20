import React from 'react';
import { IFile } from 'qusly-core';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { StyledFile, Label, Icon } from './style';

interface Props {
  data: IFile;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
}

export const File = observer(
  ({ data, onMouseDown, onMouseUp }: Props, ref: React.Ref<any>) => {
    const page = store.pages.current;

    const icon = React.useMemo(() => store.icons.getFileIcon(data), [
      data.type,
      data.ext,
    ]);

    const selectedIndex = page.selectedFiles.indexOf(data);
    const selected = selectedIndex !== -1;

    const _onMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();

        if (onMouseDown) onMouseDown(e);

        if (e.button !== 0) return;

        if (e.ctrlKey) {
          if (selected) {
            page.selectedFiles.splice(selectedIndex, 1);
          } else {
            page.selectedFiles.push(data);
          }
        }

        if (e.shiftKey) {
          const focusedIndex = page.files.indexOf(page.anchorFile);

          page.selectFiles(page.files.indexOf(data), focusedIndex);
        } else {
          page.anchorFile = data;
        }

        if (!e.ctrlKey && !e.shiftKey) {
          page.selectedFiles = [data];
        }
      },
      [page.selectedFiles, page.anchorFile, selected],
    );

    const iconStyle = React.useMemo<React.CSSProperties>(
      () => ({
        backgroundImage: `url(${icon.data})`,
        opacity: icon.opacity,
      }),
      [icon],
    );

    return (
      <StyledFile
        ref={ref}
        selected={selected}
        onMouseDown={_onMouseDown}
        onMouseUp={onMouseUp}
      >
        <Icon style={iconStyle} />
        <Label>{data.name}</Label>
      </StyledFile>
    );
  },
  { forwardRef: true },
);

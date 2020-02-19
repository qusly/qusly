import React from 'react';
import { IFile } from 'qusly-core';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { StyledFile } from './style';

interface Props {
  data: IFile;
}

export const File = observer(
  ({ data }: Props, ref: React.Ref<any>) => {
    const page = store.pages.current;

    const selectedIndex = page.selectedFiles.indexOf(data);
    const selected = selectedIndex !== -1;

    const onMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();

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

    return (
      <StyledFile ref={ref} selected={selected} onMouseDown={onMouseDown}>
        {data.name}
      </StyledFile>
    );
  },
  { forwardRef: true },
);

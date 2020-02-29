import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { IFile } from '~/renderer/interfaces';
import { StyledFile, Label, Icon } from './style';

interface Props {
  data: IFile;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
}

export const File = observer(
  ({ data, onMouseDown, onMouseUp }: Props, ref: any) => {
    const page = store.pages.current;
    const icon = store.icons.getFileIcon(data);
    const cut = page?.files.cutData.files.includes(data);

    const _onMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();

        const page = store.pages.current;

        if (page.files.renamingFile) return;
        if (onMouseDown) onMouseDown(e);

        page.files.onFileMouseDown(e, data);
      },
      [data, onMouseDown],
    );

    const _onMouseUp = React.useCallback(
      (e: React.MouseEvent) => {
        const page = store.pages.current;

        if (!page.isDragging) e.stopPropagation();
        if (onMouseUp) onMouseUp(e);

        page.files.onFileMouseUp(e, data);
      },
      [data, onMouseUp],
    );

    const onDoubleClick = React.useCallback(() => {
      if (data.type === 'folder') {
        store.pages.current.history.pushFolder(data.name);
      }
    }, [data]);

    const iconStyle = React.useMemo<React.CSSProperties>(
      () => ({
        backgroundImage: `url(${icon.data})`,
        opacity: icon.opacity,
      }),
      [icon],
    );

    React.useLayoutEffect(() => {
      return () => {
        delete store.pages.current.files.refs[data.index];
      };
    }, [data]);

    return (
      <StyledFile
        ref={r => {
          ref(r);
          if (r) store.pages.current.files.refs[data.index] = r;
        }}
        onMouseDown={_onMouseDown}
        onMouseUp={_onMouseUp}
        onDoubleClick={onDoubleClick}
        cut={cut}
      >
        <Icon style={iconStyle} />
        <Label>{data.name}</Label>
      </StyledFile>
    );
  },
  { forwardRef: true },
);

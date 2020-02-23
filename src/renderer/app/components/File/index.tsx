import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { StyledFile, Label, Icon } from './style';
import { IFile } from '~/renderer/interfaces';

interface Props {
  data: IFile;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
}

export const File = observer(
  ({ data, onMouseDown, onMouseUp }: Props, ref: any) => {
    const icon = React.useMemo(() => store.icons.getFileIcon(data), [
      data.type,
      data.ext,
    ]);

    const _onMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();

        if (onMouseDown) onMouseDown(e);

        store.pages.current.files.onFileMouseDown(e, data);
      },
      [data, onMouseDown],
    );

    const _onMouseUp = React.useCallback(
      (e: React.MouseEvent) => {
        if (onMouseUp) onMouseUp(e);

        store.pages.current.files.onFileMouseUp(e, data);
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
      >
        <Icon style={iconStyle} />
        <Label>{data.name}</Label>
      </StyledFile>
    );
  },
  { forwardRef: true },
);

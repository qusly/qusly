import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { IFile } from '~/renderer/interfaces';
import { resizeTextarea, selectFileName } from '~/renderer/utils';
import { StyledFile, LabelContainer, Label, Icon, Input } from './style';

interface Props {
  data: IFile;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
}

export const File = observer(
  ({ data, onMouseDown, onMouseUp }: Props, ref: any) => {
    const page = store.pages.current;
    const icon = store.icons.getFileIcon(data);

    const nameInputRef = React.useRef<HTMLTextAreaElement>();

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

    const onKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
          e.stopPropagation();
          page.files.rename(data, nameInputRef.current.value);
        } else {
          resizeTextarea(nameInputRef.current);
        }
      },
      [data],
    );

    const onBlur = React.useCallback(() => {
      store.pages.current.files.rename(data, nameInputRef.current.value);
    }, [data]);

    const iconStyle = React.useMemo<React.CSSProperties>(
      () => ({
        backgroundImage: `url(${icon.data})`,
        opacity: icon.opacity,
      }),
      [icon],
    );

    const renaming =
      page?.files?.renamingFile && page.files.anchorFile === data;

    React.useEffect(() => {
      if (renaming) {
        nameInputRef.current.value = data.name;
        nameInputRef.current.focus();

        resizeTextarea(nameInputRef.current);
        selectFileName(nameInputRef.current);
      }
    }, [renaming, data]);

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
        <LabelContainer>
          <Label>{data.name}</Label>
          {renaming && (
            <Input ref={nameInputRef} onKeyDown={onKeyDown} onBlur={onBlur} />
          )}
        </LabelContainer>
      </StyledFile>
    );
  },
  { forwardRef: true },
);

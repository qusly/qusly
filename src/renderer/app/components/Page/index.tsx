import React from 'react';
import { observer } from 'mobx-react-lite';
import { Selectable } from 'rectangle-selection';
import { IFile } from 'qusly-core';

import store from '../../store';
import { File } from '../File';
import { DragDrop, Droppable } from '~/renderer/components/FileDragDrop';
import { StyledPage } from './style';
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '~/renderer/components/Skeleton';

const Button = observer(({ path }: { path: string }) => {
  const page = store.pages.current;

  const onClick = () => {
    page.history.push(path);
  };

  return <button onClick={onClick}>{path}</button>;
});

export const Page = observer(() => {
  const page = store.pages.current;

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    if (!e.ctrlKey && !e.shiftKey) {
      store.pages.current.selectedFiles = [];
    }
  }, []);

  const onSelection = React.useCallback((files: IFile[]) => {
    store.pages.current.selectedFiles = files;
  }, []);

  const onDrop = React.useCallback((item: IFile) => {
    console.log(item);
  }, []);

  return (
    <StyledPage
      onSelection={onSelection}
      onMouseDown={onMouseDown}
      fast={page?.files.length >= 50}
    >
      {/* <Skeleton style={{ width: 256, height: 256 }} />
      <SkeletonCircle style={{ width: 64, height: 64, marginTop: 64 }} /> */}
      <SkeletonText />
      <p>xd</p>
    </StyledPage>
  );
});

/*
      <DragDrop onDrop={onDrop} selected={page?.selectedFiles}>
        {page?.files.map(r => (
          <Selectable key={r.name} data={r}>
            {innerRef => (
              <Droppable data={r}>
                {provided => <File ref={innerRef} data={r} {...provided} />}
              </Droppable>
            )}
          </Selectable>
        ))}
      </DragDrop>
      */

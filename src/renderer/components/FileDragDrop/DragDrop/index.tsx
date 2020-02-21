import React from 'react';
import { IPos, cursorDistance } from 'rectangle-selection';

import { DragThumb } from '../DragThumb';
import { IFile } from '~/renderer/interfaces';
import store from '~/renderer/app/store';

export type IFileDroppableData = IFile;

interface IDragDropContext {
  onDrag?: (e: React.MouseEvent) => void;
  onDrop?: (data: IFileDroppableData) => void;
}

export const DragDropContext = React.createContext<IDragDropContext>(null);

interface Props {
  onDrop?: (dest: IFileDroppableData) => any;
  distance?: number;
  children?: React.ReactNode;
}

export const DragDrop = ({ onDrop, distance, children }: Props) => {
  const active = React.useRef(false);
  const thumbVisible = React.useRef(false);

  const startPos = React.useRef<IPos>();

  const thumbRef = React.useRef<HTMLDivElement>();

  const onDrag = React.useCallback((e: React.MouseEvent) => {
    startPos.current = [e.pageX, e.pageY];

    active.current = true;
    store.pages.current.isDragging = true;

    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);
  }, []);

  const _onDrop = React.useCallback((data: IFileDroppableData) => {
    if (active.current && thumbVisible.current) {
      if (onDrop) onDrop(data);
    }
  }, []);

  const onWindowMouseMove = React.useCallback((e: MouseEvent) => {
    if (thumbRef.current) {
      const pos = [e.pageX, e.pageY];

      const visible =
        thumbVisible.current ||
        cursorDistance(pos, startPos.current) >= distance;

      if (!thumbVisible.current && visible) {
        thumbVisible.current = true;
        thumbRef.current.style.display = 'flex';
      }

      Object.assign(thumbRef.current.style, {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
      });
    }
  }, []);

  const onWindowMouseUp = React.useCallback(() => {
    if (!active.current) return;

    active.current = false;
    thumbVisible.current = false;
    startPos.current = null;
    store.pages.current.isDragging = false;

    if (thumbRef.current) {
      thumbRef.current.style.display = 'none';
    }

    window.removeEventListener('mousemove', onWindowMouseMove);
    window.removeEventListener('mouseup', onWindowMouseUp);
  }, []);

  const provider = React.useMemo<IDragDropContext>(
    () => ({
      onDrag,
      onDrop: _onDrop,
    }),
    [],
  );

  return (
    <>
      <DragDropContext.Provider value={provider}>
        {children}
      </DragDropContext.Provider>
      <DragThumb ref={thumbRef} />
    </>
  );
};

DragDrop.defaultProps = {
  distance: 20,
  selected: [],
} as Props;

import React from 'react';

import { DragDropContext, IFileDroppableData } from '../DragDrop';

interface IDraggableProvided {
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
}

interface Props {
  data: IFileDroppableData;
  children?: (provided: IDraggableProvided) => JSX.Element;
}

export const Droppable = ({ data, children }: Props) => {
  const context = React.useContext(DragDropContext);

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      context.onDrag(e);
    },
    [context],
  );

  const onMouseUp = React.useCallback(() => {
    context.onDrop(data);
  }, [data]);

  const provided = React.useMemo<IDraggableProvided>(() => {
    return {
      onMouseDown,
      onMouseUp,
    };
  }, [onMouseDown, onMouseUp]);

  return children(provided);
};

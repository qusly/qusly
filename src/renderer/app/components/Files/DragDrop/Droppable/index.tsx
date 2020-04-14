import React from 'react';

import { DragDropContext, IFileDroppableData } from '../Container';

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

  const onMouseDown = context.onDrag;

  const onMouseUp = React.useCallback(() => {
    context.onDrop(data);
  }, [context, data]);

  const provided = React.useMemo<IDraggableProvided>(() => {
    return {
      onMouseDown,
      onMouseUp,
    };
  }, [onMouseDown, onMouseUp]);

  return children(provided);
};

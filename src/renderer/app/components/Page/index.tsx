import React from 'react';
import { observer } from 'mobx-react-lite';
import { Selectable } from 'rectangle-selection';

import store from '../../store';
import { File } from '../File';
import { DragDrop, Droppable } from '../Files/DragDrop';
import { getPageContextMenu } from '../ContextMenu/Page';
import { StyledPage, Grid } from './style';

const onMouseDown = (e: React.MouseEvent) => {
  if (!e.ctrlKey && !e.shiftKey) {
    store.pages.current.files.selected = [];
  }
};

const onMouseUp = (e: React.MouseEvent) => {
  store.contextMenu.show(e, getPageContextMenu());
};

const onSelectionStart = () => {
  store.pages.current.isSelecting = true;
};

const onSelectionEnd = () => {
  store.pages.current.isSelecting = false;
};

export const Page = observer(() => {
  const page = store.pages.current;

  return (
    <StyledPage>
      <Grid
        onSelection={page?.files.onSelection}
        onSelectionStart={onSelectionStart}
        onSelectionEnd={onSelectionEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <DragDrop onDrop={page?.files.onDrop}>
          {page?.files.list.map(r => (
            <Selectable key={r.name} data={r}>
              {innerRef => (
                <Droppable data={r}>
                  {provided => <File ref={innerRef} data={r} {...provided} />}
                </Droppable>
              )}
            </Selectable>
          ))}
        </DragDrop>
      </Grid>
    </StyledPage>
  );
});

import React from 'react';
import { observer } from 'mobx-react-lite';
import { Selectable } from 'rectangle-selection';

import store from '../../store';
import { File } from '../File';
import { DragDrop, Droppable } from '~/renderer/components/FileDragDrop';
import { StyledPage, Grid } from './style';

export const Page = observer(() => {
  const page = store.pages.current;

  return (
    <StyledPage>
      <Grid
        onSelection={page?.files.onSelection}
        onMouseDown={page?.onMouseDown}
        onMouseUp={page?.onMouseUp}
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

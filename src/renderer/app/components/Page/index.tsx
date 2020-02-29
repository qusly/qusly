import React from 'react';
import { observer } from 'mobx-react-lite';
import { Selectable } from 'rectangle-selection';

import store from '../../store';
import { File } from '../File';
import { DragDrop, Droppable } from '~/renderer/components/FileDragDrop';
import { StyledPage, Grid, Preloader } from './style';

export const Page = observer(() => {
  const page = store.pages.current;

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    if (!e.ctrlKey && !e.shiftKey) {
      store.pages.current.files.selected = [];
    }
  }, []);

  console.log('page rerender');

  return (
    <StyledPage>
      {page?.loading === false ? (
        <Grid onSelection={page?.files.onSelection} onMouseDown={onMouseDown}>
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
      ) : (
        <Preloader />
      )}
    </StyledPage>
  );
});

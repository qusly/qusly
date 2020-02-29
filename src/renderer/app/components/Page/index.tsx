import React from 'react';
import { observer } from 'mobx-react-lite';
import { Selectable } from 'rectangle-selection';

import store from '../../store';
import { File } from '../File';
import { DragDrop, Droppable } from '~/renderer/components/FileDragDrop';
import { icons } from '~/renderer/constants';
import { StyledPage, Grid, Preloader } from './style';

export const Page = observer(() => {
  const page = store.pages.current;

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    if (!e.ctrlKey && !e.shiftKey) {
      store.pages.current.files.selected = [];
    }
  }, []);

  const onMouseUp = React.useCallback((e: React.MouseEvent) => {
    if (e.button === 2) {
      store.contextMenu.show(e, [
        {
          label: 'Refresh',
          accelerator: 'Ctrl+R',
          icon: icons.refresh,
          onSelect: store.pages.current.files.fetch,
        },
        {
          label: 'New folder',
          icon: icons.folderAdd,
          accelerator: 'Ctrl+Shift+N',
        },
        {
          label: 'New file',
          icon: icons.fileAdd,
        },
        {
          label: 'Paste',
          icon: icons.paste,
          iconSize: 18,
          onSelect: store.pages.current.files.onPaste,
        },
      ]);
    }
  }, []);

  return (
    <StyledPage>
      {page?.loading === false ? (
        <Grid
          onSelection={page?.files.onSelection}
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
      ) : (
        <Preloader />
      )}
    </StyledPage>
  );
});

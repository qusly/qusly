import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { SelectableGroup } from 'rectangle-selection';

import store from '~/renderer/app/store';
import { Preloader } from '~/renderer/components/Preloader';
import { File } from '../File';
import { StyledPage, PreloaderContainer } from './style';

const onSelect = (items: string[]) => {
  const page = store.pages.current;

  page.files.forEach(item => {
    const selected = items.indexOf(item.name) !== -1;

    if (item.selected !== selected) {
      item.selected = selected;
    }
  });
}

const onMouseDown = (e: React.MouseEvent) => {
  if (!e.ctrlKey && !e.shiftKey && !store.drag.active) {
    store.pages.current.unselectFiles();
  }
}

export const Page = observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  return (
    <StyledPage>
      <SelectableGroup
        onSelect={onSelect}
        onContextMenu={() => store.contextMenu.show('page')}
        onMouseDown={onMouseDown}
        style={{
          opacity: page.loading ? 0 : 1,
          pointerEvents: page.loading ? 'none' : 'auto'
        }}>
        {page.files.map(file => (
          <File key={file.name} itemKey={file.name} data={file} />
        ))}
      </SelectableGroup>
      <PreloaderContainer visible={page.loading}>
        <Preloader />
      </PreloaderContainer>
    </StyledPage>
  );
});

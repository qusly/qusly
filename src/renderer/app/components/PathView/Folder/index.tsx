import React from 'react';

import store from '~/renderer/app/store';
import { StyledFolder, Label, Chevron } from './style';

interface Props {
  label: string;
  index: number;
  last?: boolean;
}

export const Folder = ({ label, index, last }: Props) => {
  const onMouseUp = React.useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;

      const page = store.pages.current;

      if (!page.isDragging) {
        store.pages.current.history.goToFolder(index);
      } else {
        const path = page.history.folderPath(index);

        page.files.move(page.files.selected, path);
      }
    },
    [index],
  );

  return (
    <StyledFolder onMouseUp={onMouseUp} onMouseDown={e => e.stopPropagation()}>
      <Label>{label}</Label>
      {!last && <Chevron />}
    </StyledFolder>
  );
};

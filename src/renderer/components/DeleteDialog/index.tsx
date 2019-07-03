import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { CloseButton, Dialog, Title, Content, Buttons } from '../Dialog';
import { Button } from '../Button';

const onClick = () => {
  const page = store.pages.current;
  page.deleteFiles(page.selectedFiles);
  store.overlay.hide();
};

export default observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  const visible = store.overlay.content === 'delete';
  const selected = visible ? page.selectedFiles : [];
  const containsFolder = selected.find(e => e.type === 'directory');

  let title = 'file';

  if (selected.length > 1) {
    title = 'multiple files';
  } else if (containsFolder) {
    title = 'folder';
  }

  const text =
    selected.length <= 1 ? `this ${title}` : `these ${selected.length} items`;

  return (
    <Dialog visible={visible} style={{ width: 344 }}>
      <Title>Delete {title}</Title>
      <Content>Are you sure you want to delete {text}?</Content>
      <Buttons>
        <CloseButton />
        <Button background="transparent" foreground="#3F51B5" onClick={onClick}>
          DELETE
        </Button>
      </Buttons>
    </Dialog>
  );
});

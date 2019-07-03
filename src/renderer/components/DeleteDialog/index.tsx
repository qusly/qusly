import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { CloseButton, Dialog, Title, Content, Buttons, Bold } from '../Dialog';
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
  const multiple = selected.length > 1;

  let title = 'file';
  if (multiple) title = 'multiple files';
  else if (containsFolder) title = 'folder';

  return (
    <Dialog visible={visible} style={{ width: 344 }}>
      <Title>Delete {title}</Title>
      <Content>
        Are you sure you want to delete&nbsp;
        {!multiple && <span>this {title}</span>}
        {multiple && (
          <span>
            these <Bold>{selected.length} items</Bold>
          </span>
        )}
        ?
      </Content>
      <Buttons>
        <CloseButton />
        <Button background="transparent" foreground="#3F51B5" onClick={onClick}>
          DELETE
        </Button>
      </Buttons>
    </Dialog>
  );
});

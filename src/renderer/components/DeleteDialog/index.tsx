import * as React from 'react';
import { observer } from 'mobx-react';
import prettyBytes from 'pretty-bytes';

import store from '~/renderer/store';
import { CloseButton, Dialog, Title, Content, Buttons } from '../Dialog';
import { Button } from '../Button';
import { Details, Icon, Name, Size, Container } from './styles';

export default observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  const visible = store.overlay.content === 'delete';
  const selected = visible ? page.selectedFiles : [];
  const containsFolder = selected.find(e => e.type === 'directory');
  const { icon, opacity } = store.favicons.get(page.focusedFile);

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
      <Content>
        Are you sure you want to delete {text}?
        {selected.length === 1 && (
          <Container>
            <Icon icon={icon} opacity={opacity} />
            <Details>
              <Name>{page.focusedFile.name}</Name>
              <Size>200MB</Size>
            </Details>
          </Container>
        )}
      </Content>
      <Buttons>
        <CloseButton />
        <Button background="transparent" foreground="#3F51B5">
          DELETE
        </Button>
      </Buttons>
    </Dialog>
  );
});

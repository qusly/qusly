import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { DialogContent } from '~/renderer/app/store/dialog';
import { AddSite } from './AddSite';
import { StyledDialog, Container } from './style';

export const DialogContainer = observer(({ content, children }: { content: DialogContent, children: any }) => {
  return store.dialog.content === content && children;
});

export const Dialog = observer(() => {
  return (
    <StyledDialog>
      <Container>
        <AddSite />
      </Container>
    </StyledDialog>
  );
});

import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { DialogContent } from '~/renderer/app/store/dialog';
import { SiteDialog } from './Site';
import { DeleteSiteDialog } from './DeleteSite';
import { IButtonProps } from '~/renderer/components/Button';
import { StyledDialog, DialogButton, Dark, Container } from './style';

export const onDialogClose = () => {
  store.dialog.visible = false;
}

export const DialogContainer = observer(({ content, children }: { content: DialogContent | DialogContent[], children: any }) => {
  const current = store.dialog.content;

  const contentVisible = React.useMemo(() => {
    return content instanceof Array ? content.indexOf(current) !== -1 : content === current
  }, [current]);

  return (
    <Container visible={store.dialog.visible && contentVisible}>
      {children}
    </Container>
  );
});

export const CloseButton = () => {
  return <SecondaryButton label='Cancel' onClick={onDialogClose} />;
}

export const SecondaryButton = (props: IButtonProps & React.HTMLAttributes<HTMLDivElement>) => {
  return <DialogButton background='rgba(0, 0, 0, 0.08)' color='#000' {...props} />;
}

export const Dialog = observer(() => {
  return (
    <StyledDialog visible={store.dialog.visible}>
      <Dark visible={store.dialog.visible} onClick={onDialogClose} />
      <SiteDialog />
      <DeleteSiteDialog />
    </StyledDialog>
  );
});

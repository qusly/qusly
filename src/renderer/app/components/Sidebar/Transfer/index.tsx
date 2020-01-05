import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ITransferType } from 'qusly-core';

import store from '~/renderer/app/store';
import { icons } from '~/renderer/constants';
import { StyledPage, Header } from '../style';
import { StyledButton, Icon, Label } from './style';

const Button = observer(({ icon, content, children }: { icon: string, content: ITransferType, children: any }) => {
  const selected = store.transfer.content === content;

  const onClick = React.useCallback(() => {
    store.transfer.content = content;
  }, [content]);

  return (
    <StyledButton selected={selected} onClick={onClick}>
      <Icon icon={icon} selected={selected} />
      <Label>{children}</Label>
    </StyledButton>
  );
});

export const Transfer = observer(() => {
  const session = store.sessions.current;
  if (!session) return null;

  return (
    <StyledPage visible={store.activitybar.content === 'transfer'}>
      <Header>Transfer</Header>
      <div>
        <Button icon={icons.download} content='download'>Downloads</Button>
        <Button icon={icons.upload} content='upload'>Uploads</Button>
      </div>
    </StyledPage>
  );
});

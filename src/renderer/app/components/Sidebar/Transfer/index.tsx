import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { icons } from '~/renderer/constants';
import { StyledPage, Header } from '../style';
import { StyledButton, Icon, Label } from './style';

const Button = ({ icon, selected, children }: { icon: string, selected: boolean, children: any }) => {
  return (
    <StyledButton selected={selected}>
      <Icon icon={icon} selected={selected} />
      <Label>{children}</Label>
    </StyledButton>
  );
}

export const Transfer = observer(() => {
  const session = store.sessions.current;
  if (!session) return null;

  return (
    <StyledPage visible={store.activitybar.content === 'transfer'}>
      <Header>Transfers</Header>
      <div>
        <Button icon={icons.download} selected>Downloads</Button>
        <Button icon={icons.upload} selected={false}>Uploads</Button>
      </div>
    </StyledPage>
  );
});

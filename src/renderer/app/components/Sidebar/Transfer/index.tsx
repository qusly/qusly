import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { icons } from '~/renderer/constants';
import { StyledPage, Header } from '../style';
import { Button } from './style';

export const Transfer = observer(() => {
  const session = store.sessions.current;
  if (!session) return null;

  return (
    <StyledPage visible={store.activitybar.content === 'transfer'}>
      <Header>Transfers</Header>
      <Button icon={icons.download}>Downloading</Button>
      <Button icon={icons.upload}>Uploading</Button>
    </StyledPage>
  );
});

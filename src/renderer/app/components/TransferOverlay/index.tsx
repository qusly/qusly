import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { TransferItem } from './Item';
import { StyledTransfer, Section, Title } from './style';

export const TransferOverlay = observer(() => {
  if (store.activitybar.content !== 'transfer') return null;

  return (
    <StyledTransfer>
      <Section>
        <Title>Nersent data center</Title>
        <TransferItem />
      </Section>
    </StyledTransfer>
  );
});

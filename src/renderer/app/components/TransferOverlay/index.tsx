import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { Section } from './Section';
import { StyledTransfer } from './style';

export const TransferOverlay = observer(() => {
  if (store.activitybar.content !== 'transfer') return null;

  return (
    <StyledTransfer>
      {store.transfer.getSections().map(r => (
        <Section key={r._id} data={r} />
      ))}
    </StyledTransfer>
  );
});

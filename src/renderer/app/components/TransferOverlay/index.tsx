import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { Section } from './Section';
import { StyledTransfer } from './style';
import { Progressbar } from '~/renderer/components/Progressbar';

export const TransferOverlay = observer(() => {
  if (store.activitybar.content !== 'transfer') return null;

  return (
    <StyledTransfer>
      <Progressbar value={50} />
    </StyledTransfer>
  );
});

/*{store.transfer.sections.map(r => (
        <Section key={r._id} data={r} />
      ))}*/

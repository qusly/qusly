import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { Pagebar, PageTitle } from '../MenuPage/styles';
import TransferItem from '../TransferItem';
import { File } from '~/renderer/models';

export default observer(() => {
  const file: File = {
    date: new Date('2001-06-01T20:05:00.000Z'),
    permissions: { user: 6, group: 4 },
    name: 'documentation.pdf',
    size: 1724303,
    user: 'root',
    group: 'root',
    type: 'file',
    ext: '.pdf',
  };

  return (
    <React.Fragment>
      <Pagebar>
        <PageTitle>File transfer</PageTitle>
      </Pagebar>
      <TransferItem file={file} />
    </React.Fragment>
  );
});

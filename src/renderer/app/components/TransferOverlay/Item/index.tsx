import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { basename } from 'path';

import store from '~/renderer/app/store';
import { ITransferItem } from '~/interfaces';
import { StyledItem, Icon, Details, Name, Path } from './style';

export const Item = observer(({ data }: { data: ITransferItem }) => {
  const { icon, opacity } = store.icons.getPathIcon(data.remotePath) // todo;
  const filename = basename(data.remotePath);

  return (
    <StyledItem>
      <Icon icon={icon} opacity={opacity} />
      <Details>
        <Name>{filename}</Name>
        <Path>{data.remotePath}</Path>
      </Details>
    </StyledItem>
  );
});

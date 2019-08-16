import * as React from 'react';

import store from '~/renderer/app/store';
import { IFile } from '~/interfaces';
import { StyledFile, Label, Icon } from './style';

export const File = ({ data }: { data: IFile }) => {
  const { name, ext } = data;
  const { icon, opacity } = store.icons.getIcon(data);

  return (
    <StyledFile cut={false} disabled={false} selected={false}>
      <Icon icon={icon} style={{ opacity }} />
      <Label>{name}</Label>
    </StyledFile>
  );
};

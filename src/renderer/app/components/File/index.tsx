import * as React from 'react';

import store from '~/renderer/app/store';
import { IFile } from '~/interfaces';
import { StyledFile, Label, Icon } from './style';
import { icons } from '~/renderer/constants';

export const File = ({ data }: { data: IFile }) => {
  const { name } = data;

  return (
    <StyledFile cut={false} disabled={false} selected={false}>
      <Icon icon={icons.qusly} />
      <Label>{name}</Label>
    </StyledFile>
  );
};

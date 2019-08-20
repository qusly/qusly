import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { selectableItem } from 'rectangle-selection';

import store from '~/renderer/app/store';
import { IFile } from '~/interfaces';
import { StyledFile, Label, Icon } from './style';

interface Props {
  data: IFile;
}

export const File = selectableItem<Props>(observer(({ data }: Props) => {
  const { name, selected } = data;
  const { icon, opacity } = store.icons.getIcon(data);

  return (
    <StyledFile selected={selected} cut={false} disabled={false}>
      <Icon icon={icon} style={{ opacity }} />
      <Label>{name}</Label>
    </StyledFile>
  );
}));


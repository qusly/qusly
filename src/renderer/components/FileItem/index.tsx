import * as React from 'react';
import { observer } from 'mobx-react';
import { IFile } from 'qusly-core';

import store from '~/renderer/store';
import { StyledFileItem, Icon, Label } from './styles';

const onClick = (name: string) => () => {
  store.session.pathManager.push(name);
};

export default observer(({ data }: { data: IFile }) => {
  const { name } = data;
  const { icon, opacity } = store.icons.get(data);

  return (
    <StyledFileItem onClick={onClick(name)}>
      <Icon icon={icon} style={{ opacity }} />
      <Label>{name}</Label>
    </StyledFileItem>
  );
});

import * as React from 'react';

import store from '~/renderer/store';
import { Site } from '~/renderer/models';
import { StyledItem, Label, User } from './styles';

const onClick = (site: Site) => () => {
  store.tabs.addTab(site);
};

export default ({ data }: { data: Site }) => {
  return (
    <StyledItem onClick={onClick(data)}>
      <Label>{data.title}</Label>
      <User>{data.user}</User>
    </StyledItem>
  );
};

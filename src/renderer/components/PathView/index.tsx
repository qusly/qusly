import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { StyledPathView, StyledPathItem } from './styles';

export const PathItem = ({ label }: { label: string }) => {
  return <StyledPathItem>{label}</StyledPathItem>;
};

export default observer(() => {
  return (
    <StyledPathView>
      {store.session.path.map(label => (
        <PathItem key={label} label={label} />
      ))}
    </StyledPathView>
  );
});

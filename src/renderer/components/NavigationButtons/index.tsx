import { observer } from 'mobx-react';
import * as React from 'react';

import ToolbarButton from '../ToolbarButton';
import { icons } from '~/renderer/constants';
import { StyledContainer } from './style';

export default observer(() => {
  return (
    <StyledContainer>
      <ToolbarButton
        style={{ flex: 1 }}
        size={20}
        icon={icons.back}
        disabled={true}
      />
      <ToolbarButton
        style={{ flex: 1 }}
        size={20}
        icon={icons.forward}
        disabled={true}
      />
      <ToolbarButton
        style={{ flex: 1 }}
        size={20}
        icon={icons.refresh}
        disabled={true}
      />
      <ToolbarButton
        style={{ flex: 1 }}
        size={20}
        icon={icons.star}
        disabled={true}
      />
    </StyledContainer>
  );
});

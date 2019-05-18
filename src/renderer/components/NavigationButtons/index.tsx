import { observer } from 'mobx-react';
import * as React from 'react';

import ToolbarButton from '../ToolbarButton';
import { icons } from '~/renderer/constants';
import { StyledContainer } from './style';

export default observer(() => {
  return (
    <StyledContainer>
      <ToolbarButton
        size={24}
        icon={icons.chevronLeft}
        style={{ marginLeft: 8 }}
        disabled={true}
      />
      <ToolbarButton size={24} icon={icons.chevronRight} disabled={true} />
    </StyledContainer>
  );
});

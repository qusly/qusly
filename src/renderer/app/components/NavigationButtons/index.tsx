import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { ToolbarButton } from '~/renderer/components/ToolbarButton';
import { icons } from '~/renderer/constants';
import { StyledContainer } from './style';

export const NavigationButtons = observer(() => {
  return (
    <StyledContainer>
      <ToolbarButton
        size={24}
        icon={icons.chevronLeft}
      />
      <ToolbarButton
        size={24}
        icon={icons.chevronRight}
      />
      <ToolbarButton
        size={20}
        icon={icons.refresh}
      />
    </StyledContainer>
  );
});

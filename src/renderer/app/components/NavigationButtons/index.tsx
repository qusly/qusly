import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { ToolbarButton } from '~/renderer/components/ToolbarButton';
import { icons } from '~/renderer/constants';
import { StyledContainer } from './style';

export const NavigationButtons = observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  return (
    <StyledContainer>
      <ToolbarButton
        size={24}
        icon={icons.chevronLeft}
        disabled={!page.path.canGoBack}
        onClick={page.path.goBack}
      />
      <ToolbarButton
        size={24}
        icon={icons.chevronRight}
        disabled={!page.path.canGoForward}
        onClick={page.path.goForward}
      />
      <ToolbarButton
        size={20}
        icon={icons.refresh}
        disabled={page.loading}
        onClick={page.fetchFiles}
      />
    </StyledContainer>
  );
});

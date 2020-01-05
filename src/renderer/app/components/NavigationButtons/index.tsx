import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { ToolbarButton } from '~/renderer/components/ToolbarButton';
import { icons } from '~/renderer/constants';
import { StyledContainer } from './style';

export const NavigationButtons = observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  const marginLeft = 4;

  return (
    <StyledContainer>
      <ToolbarButton
        size={20}
        icon={icons.back}
        disabled={!page.path.canGoBack}
        onClick={page.path.goBack}
        style={{ marginLeft }}
      />
      <ToolbarButton
        size={20}
        icon={icons.forward}
        disabled={!page.path.canGoForward}
        onClick={page.path.goForward}
        style={{ marginLeft }}
      />
      <ToolbarButton
        size={20}
        icon={icons.refresh}
        disabled={page.loading}
        onClick={page.fetchFiles}
        style={{ marginLeft }}
      />
    </StyledContainer>
  );
});

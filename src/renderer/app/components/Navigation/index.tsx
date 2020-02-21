import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { icons } from '~/renderer/constants';
import { StyledNavigation, Button } from './style';

const BUTTON_SIZE = 20;

export const Navigation = observer(() => {
  const page = store.pages.current;
  const history = page?.history;

  return (
    <StyledNavigation>
      <Button
        size={BUTTON_SIZE}
        icon={icons.back}
        disabled={!history?.canGoBack}
        onClick={history?.goBack}
      />
      <Button
        size={BUTTON_SIZE}
        icon={icons.forward}
        disabled={!history?.canGoForward}
        onClick={history?.goForward}
      />
      <Button
        size={BUTTON_SIZE}
        icon={icons.refresh}
        disabled={page?.loading}
        onClick={page?.files.fetch}
      />
    </StyledNavigation>
  );
});

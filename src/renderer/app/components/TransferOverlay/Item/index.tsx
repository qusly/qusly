import * as React from 'react';

import { icons } from '~/renderer/constants';
import { StyledItem, Icon, Details, Name, Path, Show } from './style';

export const TransferItem = () => {
  return (
    <StyledItem>
      <Icon icon={icons.file} />
      <Details>
        <Name>video.mp4</Name>
        <Path>/home/sites-available/qusly.app</Path>
        <Show>Show in folder</Show>
      </Details>
    </StyledItem>
  );
}

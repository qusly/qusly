import * as React from 'react';

import { File } from '~/renderer/models';
import store from '~/renderer/store';
import { StyledItem, Icon, Name, Path, Details } from './styles';

export default ({ file }: { file: File }) => {
  const { icon, opacity } = store.favicons.get(file);

  return (
    <StyledItem>
      <Icon icon={icon} opacity={opacity} />
      <Details>
        <Name>name.txt</Name>
        <Path>/var/www/</Path>
      </Details>
    </StyledItem>
  );
};

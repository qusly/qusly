import * as React from 'react';

import { icons } from '~/renderer/constants/icons';
import ActivityBarItem from '../ActivityBarItem';
import { StyledActivityBar } from './styles';

export default () => {
  return (
    <StyledActivityBar>
      <ActivityBarItem page="tree" icon={icons.fileTree} />
      <ActivityBarItem page="transfer" icon={icons.fileMultiple} />
      <ActivityBarItem page="search" icon={icons.search} />
    </StyledActivityBar>
  );
};

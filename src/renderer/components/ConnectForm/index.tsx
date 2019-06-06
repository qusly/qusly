import * as React from 'react';

import { StyledForm } from './styles';
import Textfield from '../Textfield';
import { icons } from '~/renderer/constants/icons';

export default () => (
  <StyledForm>
    <Textfield label="Label" icon={icons.visible} />
  </StyledForm>
);

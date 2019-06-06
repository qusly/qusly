import * as React from 'react';

import Textfield from '../Textfield';
import { icons } from '~/renderer/constants/icons';
import Dialog from '../Dialog';
import { StyledForm } from './styles';

export default () => (
  <Dialog title="Site manager">
    <Textfield label="Label" icon={icons.visible} />
  </Dialog>
);

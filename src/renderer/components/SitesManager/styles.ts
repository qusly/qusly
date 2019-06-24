import styled from 'styled-components';
import {  centerIcon, transparency } from 'wexond-ui';

import { icons } from '~/renderer/constants/icons';

export const Add = styled.div`
  width: 32px;
  height: 32px;
  background-image: url(${icons.add});
  opacity: ${transparency.icons.inactive};
  margin-left: auto;
  margin-right: 12px;
  cursor: pointer;
  ${centerIcon(20)};

  &:hover {
    opacity: ${transparency.icons.active};
  }
`;

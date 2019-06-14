import styled from 'styled-components';
import { robotoMedium, centerIcon, transparency } from 'wexond-ui';

import { icons } from '~/renderer/constants/icons';

export const Pagebar = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
`;

export const PageTitle = styled.div`
  margin-left: 24px;
  font-size: 14px;
  ${robotoMedium()};
`;

export const Add = styled.div`
  width: 32px;
  height: 32px;
  background-image: url(${icons.add});
  opacity: ${transparency.icons.inactive};
  margin-left: auto;
  margin-right: 4px;
  cursor: pointer;
  ${centerIcon(20)};

  &:hover {
    opacity: ${transparency.icons.active};
  }
`;

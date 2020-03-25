import styled from 'styled-components';

import { robotoMedium, centerIcon } from '~/renderer/mixins';
import { icons, transparency } from '~/renderer/constants';

export const StyledFolder = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.54);

  &:hover {
    color: #000;
    background-color: rgba(0, 0, 0, 0.06);
  }

  &:first-child {
    padding-left: 12px;
  }

  &:last-child {
    color: #000;
    ${robotoMedium()};
  }
`;

export const Label = styled.div`
  font-size: 14px;
  padding: 0px 4px;
`;

export const Chevron = styled.div`
  width: 16px;
  height: 16px;
  background-image: url(${icons.chevronRight});
  opacity: ${transparency.icons.inactive};
  ${centerIcon()};
`;

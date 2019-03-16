import styled from 'styled-components';

import { PATHVIEW_HEIGHT, icons, transparency } from '~/renderer/constants';
import { robotoRegular, centerImage, robotoMedium } from '~/renderer/mixins';

export const StyledPathView = styled.div`
  width: 100%;
  height: ${PATHVIEW_HEIGHT}px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const StyledLabel = styled.div`
  font-size: 18px;
  padding: 4px 6px;
  border-radius: 6px;
  cursor: pointer;
  ${robotoRegular()};

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &:last-child {
    ${robotoMedium()};
  }
`;

export const StyledChevron = styled.div`
  width: 24px;
  height: 24px;
  opacity: ${transparency.icons.inactive};
  background-image: url(${icons.chevron});
  ${centerImage('24px', 'auto')};
`;

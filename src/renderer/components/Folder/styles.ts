import styled from 'styled-components';

import { centerImage, robotoMedium } from '~/renderer/mixins';
import { icons, transparency } from '~/renderer/constants';

export const StyledContainer = styled.div`
  width: fit-content;
  min-width: 144px;
  max-width: 196px;
  height: 48px;
  display: flex;
  align-items: center;
  margin: 64px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, ${transparency.dividers});
  overflow: hidden;
  will-change: background-color;
  transition: 0.2s background-color;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const StyledIcon = styled.div`
  min-width: 24px;
  min-height: 24px;
  opacity: ${transparency.icons.inactive};
  background-image: url(${icons.folder});
  margin-left: 12px;
  ${centerImage('24px', 'auto')};
`;

export const StyledLabel = styled.div`
  padding: 0 16px;
  font-size: 13px;
  color: rgba(0, 0, 0, ${transparency.text.high});
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ${robotoMedium()};
`;

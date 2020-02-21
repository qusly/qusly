import styled, { css } from 'styled-components';

import { shadows } from '~/renderer/mixins/shadows';
import { centerIcon } from '~/renderer/mixins/images';
import { robotoRegular, robotoMedium } from '~/renderer/mixins/typography';

export const StyledThumb = styled.div`
  width: fit-content;
  max-width: 164px;
  height: 48px;
  display: none;
  border-radius: 12px;
  background-color: #fff;
  align-items: center;
  padding: 0px 12px;
  pointer-events: none;
  position: fixed;
  justify-content: flex-start;
  z-index: 1000;
  box-shadow: ${shadows(4)};
`;

export const Icon = styled.div`
  min-width: 24px;
  min-height: 24px;
  ${centerIcon()};
`;

export const Title = styled.div`
  margin-left: 8px;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${robotoRegular()};
`;

export const Count = styled.div`
  width: 24px;
  height: 24px;
  background-color: #f44336;
  color: #fff;
  display: flex;
  font-size: 13px;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  position: absolute;
  top: -12px;
  left: calc(100% - 12px);
  ${robotoMedium()};
`;

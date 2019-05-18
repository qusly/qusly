import styled, { css } from 'styled-components';

import { transparency, icons } from '~/renderer/constants';
import { robotoMedium, centerIcon, robotoRegular } from '~/renderer/mixins';

export const StyledPathView = styled.div`
  width: 100%;
  height: 36px;
  border: 1px solid rgba(0, 0, 0, ${transparency.dividers});
  border-radius: 32px;
  display: flex;
  align-items: center;
  margin-left: 8px;
  padding-left: 12px;
  overflow: hidden;
`;

export const StyledPathItem = styled.div`
  height: calc(100% - 8px);
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #000;
  margin-left: 24px;
  padding: 0px 6px;
  cursor: pointer;
  border-radius: 4px;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    display: block;
    position: absolute;
    right: -24px;
    width: 24px;
    height: 100%;
    pointer-events: none;
    opacity: ${transparency.icons.disabled};
    background-image: url(${icons.chevronRight});
    ${centerIcon(20)};
  }

  &:hover {
    background-color: #eceff1;
  }

  &:first-child {
    margin-left: 0px;
  }

  &:last-child {
    ${robotoMedium()};
  }
`;

import styled from 'styled-components';
import { transparency, centerIcon } from 'wexond-ui';

import { icons } from '~/renderer/constants';

export const StyledPathItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.54);
  cursor: pointer;
  position: relative;
  padding-left: 4px;

  &:first-child {
    padding-left: 8px;
  }

  &:last-child {
    padding-right: 8px;
  }

  &:not(:last-child)::after {
    content: '';
    display: block;
    width: 16px;
    margin-left: 2px;
    height: 100%;
    pointer-events: none;
    opacity: ${transparency.icons.disabled};
    background-image: url(${icons.chevronRight});
    ${centerIcon(16)};
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &:first-child {
    margin-left: 0px;
  }

  &:last-child {
    color: #000;
  }
`;

import styled from 'styled-components';
import { transparency, centerIcon } from 'wexond-ui';

import { icons } from '~/renderer/constants';

export const StyledPathItem = styled.div`
  height: calc(100% - 6px);
  display: flex;
  align-items: center;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.54);
  margin-left: 16px;
  padding: 0px 6px;
  cursor: pointer;
  border-radius: 8px;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    display: block;
    position: absolute;
    right: -18px;
    width: 20px;
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

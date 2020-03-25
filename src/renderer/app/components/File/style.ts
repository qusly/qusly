import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { PRIMARY_COLOR } from '../../constants';

export const StyledFileBase = css`
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 8px;
`;

export const StyledFile = styled.div`
  border-radius: 4px;
  ${StyledFileBase};
  position: relative;
  border: 1px solid transparent;
  transition: 0.1s background-color, 0.1s border;

  &.selected {
    border: 1px solid ${PRIMARY_COLOR};
  }

  &:not(.selected):hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  ${({ cut }: { cut: boolean }) => css`
    ${cut &&
      css`
        border: 1px dashed ${PRIMARY_COLOR};
      `}
  `}
`;

export const Icon = styled.div`
  width: 32px;
  height: 32px;
  margin: 8px 0px;
  z-index: 1;
  ${centerIcon()};
`;

export const Label = styled.div`
  width: 100%;
  padding: 0px 8px;
  text-align: center;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

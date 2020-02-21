import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins/images';
import { FILE_HEIGHT } from '../../constants';

export const StyledFileBase = css`
  height: ${FILE_HEIGHT}px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const StyledFile = styled.div`
  border-radius: 4px;
  ${StyledFileBase};

  &.selected {
    background-color: rgba(0, 0, 0, 0.06);
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const Icon = styled.div`
  width: 32px;
  height: 32px;
  margin: 8px 0px;
  ${centerIcon()};
`;

export const Label = styled.div`
  max-width: 100%;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0px 8px;
`;

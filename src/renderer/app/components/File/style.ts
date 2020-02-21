import styled from 'styled-components';

import { centerIcon } from '~/renderer/mixins/images';
import { FILE_HEIGHT } from '../../constants';

export const StyledFile = styled.div`
  height: ${FILE_HEIGHT}px;
  display: flex;
  align-items: center;
  flex-direction: column;

  &.selected {
    background-color: rgba(98, 0, 234, 0.08);
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

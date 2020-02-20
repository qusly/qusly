import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins/images';

export const StyledFile = styled.div`
  height: 96px;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${({ selected }: { selected: boolean }) => css`
    background-color: ${selected
      ? `rgba(98, 0, 234, 0.08)`
      : 'rgba(0, 0, 0, 0.04)'};
  `}
`;

export const Icon = styled.div`
  width: 48px;
  height: 48px;
  ${centerIcon(32)};
`;

export const Label = styled.div`
  max-width: 100%;
  margin-top: 8px;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

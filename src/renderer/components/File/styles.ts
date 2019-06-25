import styled, { css } from 'styled-components';
import { centerIcon } from 'wexond-ui';

import { icons } from '~/renderer/constants';

export const StyledFile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0px 16px 8px 16px;

  ${({ selected }: { selected: boolean }) => css`
    background-color: ${selected ? 'rgba(98, 0, 234, 0.08)' : 'none'};

    border: ${selected
      ? `1px solid rgba(98, 0, 234, 0.12)`
      : `1px solid transparent`};

    &:hover {
      background-color: ${selected
        ? 'rgba(98, 0, 234, 0.12)'
        : 'rgba(0, 0, 0, 0.08)'};
    }
  `}
`;

export const Icon = styled.div`
  width: 48px;
  height: 48px;
  background-image: url(${icons.folder});
  ${centerIcon(32)};

  ${({ icon }: { icon: any }) => css`
    background-image: url(${icon});
  `};
`;

export const Label = styled.div`
  max-width: 100%;
  margin-top: 8px;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

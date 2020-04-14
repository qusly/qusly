import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { icons, transparency } from '~/renderer/constants';

export const StyledFolder = styled.div`
  width: calc(100% - 16px);
  margin: 0 auto;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const ExpandIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${icons.expand});
  opacity: ${transparency.icons.inactive};
  margin-right: 8px;
  ${centerIcon()};

  ${({ expanded }: { expanded: boolean }) => css`
    transform: rotate(${expanded ? 0 : -90}deg);
  `}
`;

export const Icon = styled.div`
  width: 18px;
  height: 18px;
  background-image: url(${icons.folder});
  opacity: ${transparency.icons.inactive};
  margin-right: 6px;
  ${centerIcon()};
`;

export const Label = styled.div`
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
`;

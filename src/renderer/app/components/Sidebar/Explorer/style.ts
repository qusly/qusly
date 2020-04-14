import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { icons, transparency } from '~/renderer/constants';

export const StyledFolder = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const ExpandIcon = styled.div`
  min-width: 24px;
  height: 24px;
  background-image: url(${icons.expand});
  opacity: ${transparency.icons.inactive};
  cursor: default;
  ${centerIcon(18)};

  ${({ expanded }: { expanded: boolean }) => css`
    transform: rotate(${expanded ? 0 : -90}deg);
  `}

  &:hover {
    opacity: 1;
  }
`;

export const Icon = styled.div`
  min-width: 18px;
  height: 18px;
  /* margin-left: 4px; */
  background-color: #90a4ae;
  ${centerIcon('contain', true)};

  ${({ expanded }: { expanded: boolean }) => css`
    mask-image: url(${expanded ? icons.folderOpen : icons.folder});
  `}
`;

export const Label = styled.div`
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 6px;
  /* flex: 1; */
`;

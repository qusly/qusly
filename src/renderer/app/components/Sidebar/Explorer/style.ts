import styled, { css } from 'styled-components';

import { icons, transparency } from '~/renderer/constants';
import { centerIcon, robotoRegular } from '~/renderer/mixins';

export const StyledItem = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const ExpandIcon = styled.div`
  min-width: 30px;
  min-height: 30px;
  margin-left: 6px;
  background-image: url(${icons.expand});
  border-radius: 100%;
  opacity: ${transparency.icons.inactive};
  display: flex;
  ${centerIcon(20)};

  ${({ expanded }: { expanded: boolean }) => css`
    transform: ${expanded ? 'rotate(-90deg)' : 'rotate(0deg)'};
  `}
`;

export const Icon = styled.div`
  min-width: 20px;
  min-height: 20px;
  opacity: ${transparency.icons.inactive};
  ${centerIcon(18)};

  ${({ expanded }: { expanded: boolean }) => css`
    background-image: url(${expanded ? icons.folderOpen : icons.folder});
  `}
`;

export const Label = styled.div`
  font-size: 13px;
  padding: 0px 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${robotoRegular()};
`;

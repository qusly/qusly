import styled, { css } from 'styled-components';

import { StyledContextMenu } from '~/renderer/app/components/ContextMenu/style';
import { transparency } from '~/renderer/constants/transparency';
import { icons } from '~/renderer/constants/icons';
import { EASING_FUNCTION } from '~/renderer/app/constants/design';
import { centerIcon } from '~/renderer/mixins/images';
import { shadows } from '~/renderer/mixins/shadows';

export const StyledDropdown = styled.div`
  width: 200px;
  height: 32px;
  position: relative;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.08);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Label = styled.div`
  font-size: 13px;
  margin-left: 8px;
  pointer-events: none;
  color: #000;
`;

export const DropIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-left: auto;
  margin-right: 2px;
  opacity: ${transparency.icons.inactive};
  background-image: url(${icons.expand});
  transition: 0.15s ${EASING_FUNCTION} transform;
  ${centerIcon(20)};

  ${({ expanded }: { expanded: boolean }) => css`
    transform: ${expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  `}
`;

export const Menu = styled(StyledContextMenu)`
  width: 100%;
  position: absolute;
  top: 100%;
  box-shadow: ${shadows(8)};
`;

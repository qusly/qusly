import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';
import { ACTIVITYBAR_WIDTH } from '~/renderer/app/constants';

const getIconOpacity = (selected: boolean, disabled: boolean) => {
  if (disabled) return transparency.icons.disabled;
  return selected ? 1 : transparency.icons.inactive;
}

export const StyledActivitybar = styled.div`
  width: ${ACTIVITYBAR_WIDTH}px;
  height: 100%;
`;

interface ItemProps {
  icon: string;
  selected: boolean;
  disabled: boolean;
}

export const StyledItem = styled.div`
  width: ${ACTIVITYBAR_WIDTH}px;
  height: ${ACTIVITYBAR_WIDTH}px;
  cursor: pointer;

  ${({ selected, disabled, icon }: ItemProps) => css`
    pointer-events: ${disabled ? 'none' : 'auto'};
    /*border-left: ${selected ? '2px solid #000' : 'unset'};*/

    &::after {
      opacity: ${getIconOpacity(selected, disabled)};
      background-image: url(${icon});
      /*transform: translateX(${selected ? -1 : 0}px);*/
    }
  `}

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    ${centerIcon(24)};
  }

  &:hover::after {
    opacity: 1;
  }
`;

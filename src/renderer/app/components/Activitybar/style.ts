import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';
import { ACTIVITYBAR_WIDTH } from '~/renderer/app/constants';

export const StyledActivitybar = styled.div`
  width: ${ACTIVITYBAR_WIDTH}px;
  height: 100%;
`;

export const StyledItem = styled.div`
  width: ${ACTIVITYBAR_WIDTH}px;
  height: ${ACTIVITYBAR_WIDTH}px;
  cursor: pointer;

  ${({ disabled }: { disabled: boolean }) => css`
    pointer-events: ${disabled ? 'none' : 'auto'};
  `}
`;

interface IconProps {
  icon: string;
  selected: boolean;
  disabled: boolean;
}

export const ItemIcon = styled.div`
  width: 100%;
  height: 100%;
  ${centerIcon(24)};

  ${({ icon, selected, disabled }: IconProps) => {
    let opacity = selected ? 1 : transparency.icons.inactive;

    if (disabled) {
      opacity = transparency.icons.disabled;
    }

    return css`
      opacity: ${opacity};
      background-image: url(${icon});
    `
  }};

  &:hover {
    opacity: 1;
  }
`;

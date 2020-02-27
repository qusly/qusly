import styled, { css } from 'styled-components';

import { BACKGROUND_COLOR } from '../../constants';
import { centerIcon, centerVertical } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';

export const StyledActivitybar = styled.div`
  width: 52px;
  height: 100%;
  background-color: ${BACKGROUND_COLOR};
`;

interface ItemProps {
  icon: string;
  selected: boolean;
  disabled: boolean;
}

export const StyledItem = styled.div`
  width: 100%;
  height: 48px;
  position: relative;
  cursor: pointer;

  ${({ selected, disabled, icon }: ItemProps) => css`
    pointer-events: ${disabled ? 'none' : 'auto'};

    &::before {
      opacity: ${selected ? 1 : 0};
    }

    &::after {
      background-image: url(${icon});

      ${selected &&
        css`
          opacity: 1 !important;
        `}

      ${disabled &&
        css`
          opacity: ${transparency.icons.disabled};
        `}
    }
  `};

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 32px;
    background-color: #000;
    ${centerVertical()};
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    opacity: ${transparency.icons.inactive};
    ${centerIcon(24)};
  }

  &:hover::after {
    opacity: 1;
  }
`;

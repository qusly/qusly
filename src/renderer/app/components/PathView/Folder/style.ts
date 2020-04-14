import styled, { css } from 'styled-components';

import { centerIcon, robotoMedium } from '~/renderer/mixins';
import { icons, transparency } from '~/renderer/constants';

export const Label = styled.div`
  cursor: pointer;
  font-size: 16px;
  padding: 8px 4px;
  border-radius: 4px;

  ${({ last }: { last: boolean }) => css`
    ${last &&
      css`
        ${robotoMedium()};
      `}
  `}

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &::first-letter {
    text-transform: uppercase;
  }
`;

export const Chevron = styled.div`
  width: 16px;
  height: 16px;
  background-image: url(${icons.chevronRight});
  opacity: ${transparency.icons.disabled};
  ${centerIcon()};
`;

import styled, { css } from 'styled-components';

import { transparency } from '~/renderer/constants';
import { centerIcon } from '~/renderer/mixins';

export const StyledItem = styled.div`
  width: 100%;
  height: 32px;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
  white-space: nowrap;

  ${({ icon, disabled }: { icon: string, disabled?: boolean }) => css`
    color: ${disabled
      ? `rgba(0, 0, 0, ${transparency.text.disabled})`
      : '#000'};

    &:hover {
      background-color: ${!disabled ? 'rgba(0, 0, 0, 0.04)' : 'transparent'};
    }

    ${icon && css`
      &:before {
        content: '';
        width: 20px;
        height: 20px;
        opacity: 0.54;
        margin-right: 12px;
        background-image: url(${icon});
        ${centerIcon()};
      }
    `}
  `}
`;

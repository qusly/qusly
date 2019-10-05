import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';

export const Button = styled.div`
  width: calc(100% - 16px);
  height: 40px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 6px;
  transition: 0.15s background-color;

  ${({ icon }: { icon: string }) => css`
    &::before {
      background-image: url(${icon});
    }
  `}

  &::before {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    margin: 0px 8px;
    opacity: ${transparency.icons.inactive};
    ${centerIcon(20)};
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

import styled, { css } from 'styled-components';

import { noUserSelect } from '~/renderer/mixins';
import { ERROR_COLOR } from '~/renderer/app/constants';

export const Input = styled.input`
  width: 100%;
  height: 36px;
  border: none;
  outline: none;
  padding-left: 16px;
  border-radius: 64px;
  background-color: rgba(0, 0, 0, 0.08);
  will-change: background-color;
  transition: 0.1s background-color;

  ${({ error }: { error?: boolean }) => css`
    ${error &&
      css`
        box-shadow: 0 0 0 2px ${ERROR_COLOR};
      `}
  `}

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    ${noUserSelect()};
  }
`;

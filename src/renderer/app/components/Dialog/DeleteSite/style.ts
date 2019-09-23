import styled from 'styled-components';

import { Input as Textfield } from '~/renderer/components/Input';

export const Input = styled(Textfield)`
  width: 100%;

  &:not(:first-child) {
    margin-top: 16px;
  }
`;

export const Row = styled.div`
  display: flex;
  margin-top: 16px;
`;

import styled from 'styled-components';

import { robotoLight } from '~/renderer/mixins';

export const StyledSection = styled.div`
  width: 100%;
  max-width: 640px;
  margin: 16px auto 0px;
`;

export const Title = styled.div`
  font-size: 20px;
  color: #000;
  padding-bottom: 4px;
  ${robotoLight()};
`;

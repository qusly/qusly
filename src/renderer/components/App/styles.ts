import styled from 'styled-components';

import { icons } from '@renderer/constants';

export const IconTest = styled.div`
  width: 32px;
  height: 32px;
  background-color: red;
  background-image: url(${icons.add});
  background-size: 32px 32px;
  background-position: center;
`;

export const Btn = styled.div`
  width: 144px;
  height: 52px;
  background-color: blue;
  margin-top: 64px;
  position: relative;
`;

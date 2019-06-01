import styled from 'styled-components';

import { noButtons } from '~/renderer/mixins';

export const Container = styled.div`
  width: calc(100% - 2px);
  height: 100%;
  overflow: auto;
  ${noButtons()};
`;

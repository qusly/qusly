import styled from 'styled-components';

import { transparency } from '~/renderer/constants';

export const StyledAppBar = styled.div`
  padding-left: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, ${transparency.dividers});
`;

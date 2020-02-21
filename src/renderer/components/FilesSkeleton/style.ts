import styled, { keyframes } from 'styled-components';

import { EASING_FUNCTION } from '~/renderer/app/constants';
import { StyledPageGridBase } from '~/renderer/app/components/Page/style';

export const ANIMATION_TIME = 1600;

const animation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(64px);
  }
  25%, 80% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
  }
`;

export const StyledFilesSkeleton = styled.div`
  overflow: hidden;
  animation: ${animation} ${ANIMATION_TIME}ms ${EASING_FUNCTION} infinite;
  ${StyledPageGridBase};
`;

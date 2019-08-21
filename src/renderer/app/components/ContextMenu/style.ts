import styled, { css } from 'styled-components';

import { shadows } from '~/renderer/mixins';

export const StyledContextMenu = styled.div`
  width: 244px;
  position: fixed;
  z-index: 1000;
  padding: 8px 0px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: ${shadows(6)};

  ${({ visible }: { visible: boolean }) => css`
    pointer-events: ${visible ? 'auto' : 'none'};
    opacity: ${visible ? 1 : 0};
    transition: ${visible ? '0.15s opacity' : 'unset'};
  `}
`;

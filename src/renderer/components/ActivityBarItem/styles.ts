import styled, { css } from 'styled-components';

import { transparency } from '~/renderer/constants';
import { centerIcon } from '~/renderer/mixins';

export const StyledItem = styled.div`
  width: 56px;
  height: 56px;
  cursor: pointer;
  transition: 0.15s opacity;
  ${centerIcon(24)};

  &:hover {
    opacity: 0.8;
  }

  ${({ icon, selected }: { icon: any, selected: boolean }) => css`
    opacity: ${selected ? 0.8 : transparency.icons.inactive};
    background-image: url(${icon});
  `}
`;

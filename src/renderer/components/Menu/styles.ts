import styled, { css } from 'styled-components';

import { noButtons, centerIcon } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';

export const Container = styled.div`
  width: calc(100% - 2px);
  height: 100%;
  overflow: auto;
  ${noButtons()};
`;

export const StyledButtons = styled.div`
  width: 56px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.08);
`;

export const StyledButton = styled.div`
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

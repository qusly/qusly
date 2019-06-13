import styled, { css } from 'styled-components';
import { noButtons } from 'wexond-ui';

export const StyledFilesView = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 24px;
  transition: 0.1s opacity;
  display: grid;
  grid-gap: 24px;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  ${noButtons()};

  ${({ visible }: { visible: boolean }) => css`
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'auto' : 'none'};
  `};
`;

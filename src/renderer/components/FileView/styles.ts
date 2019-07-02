import styled, { css } from 'styled-components';
import { noButtons } from 'wexond-ui';

export const StyledFilesView = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 8px 24px 24px 24px;
  transition: 0.1s opacity;
  display: grid;
  grid-gap: 8px;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  position: relative;
  ${noButtons()};

  ${({ visible }: { visible: boolean }) => css`
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'auto' : 'none'};
  `};
`;

export const SelectionRegion = styled.div`
  background-color: rgba(98,0,234,0.08);
  border: 1px solid rgba(98,0,234,0.12);
  position: absolute;
  pointer-events: none;

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'block' : 'none'};
  `}
`;

import styled from 'styled-components';

import { button } from '~/renderer/mixins';

export const StyledButton = styled.div`
  width: fit-content;
  min-width: 64px;
  height: 36px;
  display: flex;
  padding: 0px 12px;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #673AB7;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  ${button()};

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #673AB7;
    opacity: 0;
    transition: 0.2s background-color;
  }

  &:hover::before {
    opacity: 0.12;
  }
`;

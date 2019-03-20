import styled, { css } from 'styled-components';

import { centerImage } from '~/renderer/mixins';

export const StyledWindowButtons = styled.div`
  display: flex;
  margin-left: auto;
`;

interface ButtonProps {
  icon: string;
  isClose?: boolean;
}

export const StyledButton = styled.div`
  width: 45px;
  height: 42px;
  min-width: 45px;
  position: relative;
  margin-right: 1px;
  transition: 0.2s background-color;
  -webkit-app-region: no-drag;

  &:first-child {
    margin-right: 0;
  }

  &:hover {
    background-color: ${({ isClose }: ButtonProps) =>
      !isClose ? 'rgba(196, 196, 196, 0.4)' : '#e81123'};
  }
`;

interface IconProps {
  icon: string;
  isClose?: boolean;
}

export const StyledIcon = styled.div`
  width: 100%;
  height: 100%;
  transition: 0.2s filter;
  ${centerImage('11px', 'auto')};

  ${({ icon, isClose }: IconProps) => css`
    background-image: url(${icon});

    &:hover {
      filter: ${isClose && 'invert(100%)'};
    }
  `};
`;

import styled, { css } from 'styled-components';

import { transparency } from '~/renderer/constants';
import { coverImage, centerImage } from '~/renderer/mixins';

export const StyledContainer = styled.div`
  width: 144px;
  margin: 64px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, ${transparency.dividers});
  overflow: hidden;
  position: relative;
  will-change: background-color;
  transition: 0.2s background-color;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

interface IMediaProps {
  image: string;
  icon: string;
}

export const StyledMedia = styled.div`
  width: 100%;
  padding-top: 56.25%;

  ${({ image, icon }: IMediaProps) => css`
    background-image: url(${icon || image});

    ${image ? coverImage() : centerImage('auto', '42px')};
  `};
`;

export const StyledLabel = styled.div`
  font-size: 13px;
  text-align: center;
  padding: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

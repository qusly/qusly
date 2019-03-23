import styled, { css } from 'styled-components';

import { transparency, PRIMARY_COLOR } from '~/renderer/constants';
import { centerImage, robotoMedium, robotoRegular } from '~/renderer/mixins';

export const StyledItem = styled.div`
  width: 100%;
  min-width: 80px;
  max-width: 168px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
`;

interface IIconProps {
  selected: boolean;
  icon: any;
}

export const StyledIcon = styled.div`
  min-width: 24px;
  min-height: 24px;
  ${centerImage('24px', 'auto')};

  ${({ selected, icon }: IIconProps) => css`
    background-color: ${selected ? PRIMARY_COLOR : '#000'};
    mask-image: url(${icon});
    opacity: ${selected
      ? transparency.icons.active
      : transparency.icons.inactive};
  `};
`;

export const StyledLabel = styled.div`
  font-size: 12px;
  margin-top: 4px;
  ${robotoRegular()};

  ${({ selected }: { selected: boolean }) =>
    css`
      color: ${selected
        ? PRIMARY_COLOR
        : `rgba(0, 0, 0, ${transparency.text.medium})`};
      ${robotoMedium()};
    `}
`;

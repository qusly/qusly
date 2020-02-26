import * as React from 'react';

import { Path, StyledPreloader, Background } from './style';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  thickness?: number;
  size?: number;
}

const circleProps: React.SVGProps<SVGCircleElement> = {
  cx: '50',
  cy: '50',
  r: '20',
  fill: 'none',
  strokeMiterlimit: '10',
};

export const Preloader = ({ color, size, thickness, ...props }: Props) => {
  return (
    <div {...props}>
      <StyledPreloader size={size} color={color} thickness={thickness}>
        <svg viewBox="25 25 50 50">
          <Background {...(circleProps as any)} />
          <Path {...(circleProps as any)} />
        </svg>
      </StyledPreloader>
    </div>
  );
};

Preloader.defaultProps = {
  thickness: 6,
  size: 30,
  color: '#3F51B5',
};

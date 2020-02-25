import { css } from 'styled-components';

export const centerIcon = (
  size: number | 'contain' = 'contain',
  useMask = false,
) => {
  let s: string = size.toString();

  if (typeof size === 'number') s += 'px';

  const prefix = !useMask ? 'background' : 'mask';

  return css`
    ${prefix}-size: ${s} ${size === 'contain' ? '' : 'auto'};
    ${prefix}-position: center;
    ${prefix}-repeat: no-repeat;
  `;
};

export const customImage = (
  width: string,
  height: string,
  left: string,
  top: string,
) => css`
  background-size: ${width} ${height};
  background-position: ${left} ${top};
  background-repeat: no-repeat;
`;

export const coverImage = () => css`
  background-size: cover;
  background-repeat: no-repeat;
`;

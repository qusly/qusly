import { css } from 'styled-components';

interface IOptions {
  size?: number;
  color?: string;
  hoverColor?: string;
  alwaysVisible?: boolean;
}

const defaultOptions: IOptions = {
  size: 6,
  alwaysVisible: true,
  color: 'rgba(0, 0, 0, 0.38)',
  hoverColor: 'rgba(0, 0, 0, 0.54)',
}

export const noButtons = (options?: IOptions) => {
  const { color, hoverColor, size, alwaysVisible } = { ...defaultOptions, ...options };

  return css`
   &:hover::-webkit-scrollbar-thumb {
      background-color: ${color};
    }
  
    &::-webkit-scrollbar {
      width: ${size}px;
      height: ${size}px;
    }
  
    &::-webkit-scrollbar-button {
      width: 0px;
      height: 0px;
    }
  
    &::-webkit-scrollbar-thumb {
      background-color: ${alwaysVisible ? color : 'inherit'};
      border: none;
      border-radius: 0px;
      opacity: 0 !important;
      transition: 2s background-color;
    }
  
    &::-webkit-scrollbar-thumb:hover {
      background-color: ${hoverColor};
    }

    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }
`;
}

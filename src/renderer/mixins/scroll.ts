export const noButtons = (
  size: string = '6px',
  color: string = 'rgba(0, 0, 0, 0.38)',
  hoverColor: string = 'rgba(0, 0, 0, 0.54)',
) => `
    &:hover::-webkit-scrollbar-thumb {
      background-color: ${color};
    }

    &::-webkit-scrollbar {
      width: ${size};
      height: ${size};
    }

    &::-webkit-scrollbar-button {
      width: 0px;
      height: 0px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: inherit;
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

import { IPos } from '~/interfaces';

export const getMenuPosition = (el: HTMLElement, mousePos: IPos): IPos => {
  let { top, left } = mousePos;

  const screenWidth = document.body.clientWidth;
  const screenHeight = document.body.clientHeight;

  const width = el.clientWidth;
  const height = el.clientHeight;

  if (top + height > screenHeight && top - height > 0) {
    top -= height;
  }

  if (left + width > screenWidth) {
    left -= width;
  }

  return { top, left };
};

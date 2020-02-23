import React from 'react';
import { IPos } from 'rectangle-selection';

export const getMenuPosition = (
  e: MouseEvent | React.MouseEvent<any>,
  ref: HTMLElement,
): IPos => {
  const screenWidth = document.body.clientWidth;
  const screenHeight = document.body.clientHeight;

  const width = ref.clientWidth;
  const height = ref.clientHeight;

  let left = e.pageX;
  let top = e.pageY;

  if (top + height > screenHeight && top - height > 0) {
    top -= height;
  }

  if (left + width > screenWidth) {
    left -= width;
  }

  return [left, top];
};

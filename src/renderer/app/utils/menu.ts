import React from 'react';

export const setMenuPosition = (
  e: MouseEvent | React.MouseEvent<any>,
  ref: HTMLElement,
) => {
  let left = e.pageX;
  let top = e.pageY;

  requestAnimationFrame(() => {
    const screenWidth = document.body.clientWidth;
    const screenHeight = document.body.clientHeight;

    const width = ref.clientWidth;
    const height = ref.clientHeight;

    if (top + height > screenHeight && top - height > 0) {
      top -= height;
    }

    if (left + width > screenWidth) {
      left -= width;
    }

    Object.assign(ref.style, {
      top: `${top}px`,
      left: `${left}px`,
    } as React.CSSProperties);
  });
};

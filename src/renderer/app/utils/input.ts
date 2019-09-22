import { MutableRefObject } from 'react';

export const resizeTextarea = (el: HTMLTextAreaElement) => {
  el.style.padding = '';
  el.style.height = '0px';

  requestAnimationFrame(() => {
    el.style.padding = '4px 8px';
    el.style.height = `${el.scrollHeight}px`;
  });
}

export const selectFileName = (el: HTMLTextAreaElement | HTMLInputElement) => {
  const value = el.value;
  const dotIndex = value.lastIndexOf('.');
  const endIndex = dotIndex <= 0 ? value.length : dotIndex

  el.setSelectionRange(0, endIndex);
}

export const ensureValue = (...inputs: HTMLInputElement[] | MutableRefObject<HTMLInputElement>[]) => {
  for (const input of inputs) {
    const value = input instanceof HTMLInputElement ? input.value : input.current.value;

    if (!value.trim().length) {
      return false;
    }
  }

  return true;
}

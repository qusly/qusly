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
  const values = getValues(...inputs);
  return values.findIndex(r => !r.length) === -1;
}

export const getValues = (...inputs: HTMLInputElement[] | MutableRefObject<HTMLInputElement>[]) => {
  const values: string[] = [];

  for (const input of inputs) {
    const value: any = input instanceof HTMLInputElement ? input.value : input.current.value;

    values.push(value.trim());
  }

  return values;
}

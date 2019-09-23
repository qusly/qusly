import { MutableRefObject } from 'react';

import { Dropdown } from '~/renderer/components/Dropdown';

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

type IFormControl = HTMLInputElement | MutableRefObject<HTMLInputElement | Dropdown>;

export const ensureValue = (...inputs: IFormControl[]) => {
  const values = getValues(...inputs);
  return values.findIndex(r => !r.length) === -1;
}

export const getValues = (...inputs: IFormControl[]) => {
  const values: string[] = [];

  for (const input of inputs) {
    const value: any = input instanceof HTMLInputElement ? input.value : input.current.value;
    values.push(value.trim());
  }

  return values;
}

export const setValues = (...list: ([IFormControl, any])[]) => {
  list.forEach(item => {
    const [input, value] = item;

    if (input instanceof HTMLInputElement) {
      input.value = value;
    } else {
      input.current.value = value;
    }
  });
}

export const clearValues = (...inputs: IFormControl[]) => {
  for (const input of inputs) {
    if (input instanceof HTMLInputElement) {
      input.value = ''
    } else {
      input.current.value = '';
    }
  }
}

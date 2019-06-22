import { RefObject } from 'react';

import { Textfield } from '../components/Textfield';
import { Dropdown } from '../components/Dropdown';
import { PasswordInput } from '../components/PasswordInput';

type Field = Dropdown | Textfield | PasswordInput;

interface Fields {
  [key: string]: RefObject<any>;
}

interface Values {
  [key: string]: string;
}

export const digitsOnly = (str: string) => notEmpty(str) && /^\d+$/.test(str);

export const notEmpty = (str: string) => str.trim().length !== 0;

export class Form {
  constructor(public fields: Fields = {}) { };

  private iterateFields(fn: (field: Field, key?: string) => void) {
    for (const key in this.fields) {
      fn(this.fields[key].current, key);
    }
  }

  public validate() {
    let error = false;

    this.iterateFields(input => {
      if (!input.test()) {
        error = true;
      }
    });

    return !error;
  }

  public clear() {
    this.iterateFields(input => input.clear());
  }

  public get values() {
    const values: Values = {};

    this.iterateFields((input, key) => {
      values[key] = input.value;
    });

    return values;
  }
}

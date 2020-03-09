import { observable, action } from 'mobx';
import { EventEmitter } from 'events';

import {
  IDialogData,
  IDialogRes,
  IDialogFieldsMap,
} from '~/renderer/interfaces';

export declare interface DialogStore {
  once(event: 'save', listener: () => void): this;
  once(event: 'cancel', listener: () => void): this;
}

export class DialogStore extends EventEmitter {
  @observable
  public visible = false;

  @observable
  public data: IDialogData;

  public fieldsMap: IDialogFieldsMap = {};

  @action
  public show(data: IDialogData) {
    if (this.visible) {
      this.emit('cancel');
    }

    this.data = data;
    this.visible = true;

    return new Promise<IDialogRes>(resolve => {
      this.once('save', () => {
        const values: IDialogRes = {};

        for (const field in this.fieldsMap) {
          values[field] = this.fieldsMap[field].value;
        }

        this.removeAllListeners();
        resolve(values);
      });

      this.once('cancel', () => {
        this.removeAllListeners();
        resolve();
      });
    });
  }

  @action
  public hide = (action: 'cancel' | 'save' = 'cancel') => {
    if (this.visible) {
      this.emit(action);
      this.visible = false;
      this.fieldsMap = {};
    }
  };
}

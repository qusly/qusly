import { observable, action } from 'mobx';
import { EventEmitter } from 'events';

import {
  IDialogData,
  IDialogRes,
  IDialogFieldsMap,
} from '~/renderer/interfaces';

export declare interface DialogStore {
  once(event: 'save', listener: (fields: IDialogFieldsMap) => void): this;
  once(event: 'cancel', listener: () => void): this;
}

export class DialogStore extends EventEmitter {
  @observable
  public visible = false;

  @observable
  public data: IDialogData;

  @action
  public show(data: IDialogData) {
    if (this.visible) {
      this.emit('cancel');
    }

    this.data = data;
    this.visible = true;

    return new Promise<IDialogRes>(resolve => {
      this.once('save', fields => {
        const values: IDialogRes = {};

        for (const field in fields) {
          values[field] = fields[field].value;
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
  public hide() {
    this.visible = false;
  }

  public onSave = (fields: IDialogFieldsMap) => {
    this.hide();
    this.emit('save', fields);
  };

  public onCancel = () => {
    this.hide();
    this.emit('cancel');
  };
}

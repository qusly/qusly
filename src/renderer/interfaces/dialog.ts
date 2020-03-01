export interface IDialogData {
  title: string;
  fields?: IDialogField[];
  focusedField?: string;
  onMount?: (fields: IDialogFieldsMap) => void;
  onUnmount?: (fields: IDialogFieldsMap) => void;
  cancelButton?: string;
  submitButton?: string;
}

export interface IDialogFieldsMap {
  [key: string]: HTMLInputElement;
}

export interface IDialogField {
  type?: 'input';
  label?: string;
  value?: string;
  placeholder?: string;
  saveOnEnter?: boolean;
}

export interface IDialogRes {
  [key: string]: string;
}

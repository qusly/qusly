export interface IDialogData {
  title: string;
  fields?: IDialogField[];
  onMount?: (fields: IDialogFieldsMap) => void;
  onUnmount?: (fields: IDialogFieldsMap) => void;
}

export interface IDialogFieldsMap {
  [key: string]: HTMLInputElement;
}

export interface IDialogField {
  type?: 'input';
  label?: string;
  value?: string;
  placeholder?: string;
}

export interface IDialogRes {
  [key: string]: string;
}

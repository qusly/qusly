export interface IDialogData {
  title: string;
  fields?: IDialogField[];
}

export interface IDialogField {
  type?: 'input';
  label?: string;
  value?: string;
}

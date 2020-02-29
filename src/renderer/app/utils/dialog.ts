import { IDialogData } from '~/renderer/interfaces';

export const getRenameFileDialog = (): IDialogData => {
  return {
    title: 'Rename file',
    fields: [
      {
        type: 'input',
        label: 'Name',
        value: 'XDDD',
      },
    ],
  };
};

import { IDialogData } from '~/renderer/interfaces';
import store from '../store';

export const getRenameFileDialog = (): IDialogData => {
  const page = store.pages.current;

  return {
    title: 'Rename file',
    fields: [
      {
        type: 'input',
        label: 'name',
        placeholder: 'Name',
        value: page.files.anchorFile.name,
      },
    ],
  };
};

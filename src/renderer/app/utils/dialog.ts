import { IDialogData } from '~/renderer/interfaces';
import store from '../store';

export const getRenameFileDialog = (): IDialogData => {
  const page = store.pages.current;
  const file = page.files.anchorFile;

  return {
    title: `Rename ${file.type === 'folder' ? 'folder' : 'file'}`,
    fields: [
      {
        type: 'input',
        label: 'name',
        placeholder: 'New name',
        value: file.name,
        saveOnEnter: true,
      },
    ],
    onMount: fields => {
      const input = fields.name;
      const dotIndex = input.value.lastIndexOf('.');
      const endIndex = dotIndex <= 0 ? input.value.length : dotIndex;

      input.focus();
      input.setSelectionRange(0, endIndex);
    },
  };
};

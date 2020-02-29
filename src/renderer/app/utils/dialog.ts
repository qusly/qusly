import { IDialogData } from '~/renderer/interfaces';
import store from '../store';

export const getRenameFileDialog = (): IDialogData => {
  const page = store.pages.current;
  let _fields: any;

  const onFieldInput = (e: KeyboardEvent) => {
    console.log('wr');
    if (e.key === 'Enter') store.dialog.onSave(_fields);
  };

  return {
    title: 'Rename a file',
    fields: [
      {
        type: 'input',
        label: 'name',
        placeholder: 'Name',
        value: page.files.anchorFile.name,
      },
    ],
    onMount: fields => {
      _fields = fields;

      const input = fields.name;
      const dotIndex = input.value.lastIndexOf('.');
      const endIndex = dotIndex <= 0 ? input.value.length : dotIndex;

      input.focus();
      input.setSelectionRange(0, endIndex, 'forward');
      input.addEventListener('keydown', onFieldInput);
    },
    onUnmount: fields => {
      const input = fields.name;
      input.removeEventListener('keydown', onFieldInput);
    },
  };
};

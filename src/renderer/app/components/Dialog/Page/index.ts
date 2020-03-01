import { IDialogData } from '~/renderer/interfaces';
import store from '~/renderer/app/store';

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

export const getNewFileDialog = (
  type: 'file' | 'folder' = 'file',
): IDialogData => {
  const page = store.pages.current;

  return {
    title: `New ${type}`,
    focusedField: 'name',
    fields: [
      {
        type: 'input',
        label: 'name',
        placeholder: 'Name',
        saveOnEnter: true,
        value: page.files.getUniqueFileName(type),
      },
    ],
    submitButton: 'Add',
  };
};

export const getDeleteFileDialog = (): IDialogData => {
  const page = store.pages.current;
  const selected = page.files.selected;
  const file = page.files.anchorFile;

  let title = 'Delete ';

  if (selected.length > 1) {
    title += `these ${selected.length} items?`;
  } else {
    title += `${file.type === 'folder' ? 'folder' : 'file'} ${file.name}?`;
  }

  return {
    title,
    submitButton: 'Delete',
  };
};

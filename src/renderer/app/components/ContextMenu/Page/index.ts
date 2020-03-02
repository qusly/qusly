import store from '~/renderer/app/store';
import { IContextMenuData } from '~/renderer/interfaces';
import { icons } from '~/renderer/constants';
import {
  getNewFileDialog,
  getRenameFileDialog,
  getDeleteFileDialog,
} from '../../Dialog/Page';

export const getPageContextMenu = (): IContextMenuData => {
  const page = store.pages.current;

  const noCutFiles = !page.files.cutData.files.length;

  return {
    items: [
      {
        label: 'Refresh',
        accelerator: 'Ctrl+R',
        icon: icons.refresh,
        onSelect: page.files.fetch,
      },
      { type: 'divider' },
      {
        label: 'Paste',
        icon: icons.paste,
        iconSize: 18,
        onSelect: page.files.onPaste,
        hidden: noCutFiles,
      },
      { type: 'divider', hidden: noCutFiles },
      {
        label: 'New folder',
        icon: icons.folderAdd,
        accelerator: 'Ctrl+Shift+N',
        onSelect: async () => {
          const res = await store.dialog.show(getNewFileDialog('folder'));
          if (res) page.files.createBlank(res.name, 'folder');
        },
      },
      {
        label: 'New file',
        icon: icons.fileAdd,
        onSelect: async () => {
          const res = await store.dialog.show(getNewFileDialog());
          if (res) page.files.createBlank(res.name, 'file');
        },
      },
      {
        label: 'Upload',
        icon: icons.uploadOutline,
        disabled: true,
      },
    ],
  };
};

export const getFileContextMenu = (): IContextMenuData => {
  const page = store.pages.current;

  const containsFile = !!page.files.selected.find(r => r.type !== 'folder');
  const multiple = page.files.selected.length > 1;

  return {
    items: [
      {
        label: 'Open',
        icon: icons.folderOutline,
        hidden: multiple || containsFile,
        onSelect: () => {
          page.history.pushFolder(page.files.anchorFile.name);
        },
      },
      {
        label: 'Open in new tab',
        icon: icons.openInNew,
        iconSize: 18,
        hidden: containsFile,
        onSelect: () => {
          const path = page.history.path;

          store.tabs.addTab({
            config: page.session.config,
            path: `${path}/${page.files.anchorFile.name}`,
            active: true,
          });
        },
      },
      {
        label: 'Open with',
        icon: icons.apps,
        iconSize: 18,
        hidden: multiple || !containsFile,
        disabled: true,
      },
      { type: 'divider', hidden: multiple === containsFile && containsFile },
      {
        label: 'Cut',
        icon: icons.cut,
        iconSize: 16,
        accelerator: 'Ctrl+X',
        onSelect: () => {
          page.files.cutFiles(...page.files.selected);
        },
      },
      {
        label: 'Paste',
        icon: icons.paste,
        iconSize: 18,
        accelerator: 'Ctrl+V',
        onSelect: page.files.onPaste,
        hidden: !page.files.cutData.files.length || containsFile,
      },
      { type: 'divider' },
      {
        label: 'Details',
        icon: icons.details,
        iconSize: 18,
        disabled: true,
      },
      {
        label: 'Download',
        icon: icons.downloadOutline,
        disabled: true,
      },
      {
        label: 'Upload',
        icon: icons.uploadOutline,
        disabled: true,
      },
      { type: 'divider' },
      {
        label: 'Rename',
        icon: icons.edit,
        accelerator: 'F2',
        onSelect: async () => {
          const res = await store.dialog.show(getRenameFileDialog());

          if (res) {
            page.files.rename(page.files.anchorFile, res.name);
          }
        },
        hidden: multiple,
      },
      {
        label: 'Delete',
        icon: icons.delete,
        iconSize: 20,
        accelerator: 'Del',
        onSelect: async () => {
          const res = await store.dialog.show(getDeleteFileDialog());
          if (res) await page.files.delete(page.files.selected);
        },
      },
    ],
  };
};
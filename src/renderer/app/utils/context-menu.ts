import store from '../store';
import { IContextMenuData } from '~/renderer/interfaces';
import { icons } from '~/renderer/constants';
import { getRenameFileDialog } from './dialog';

export const getPageContextMenu = (): IContextMenuData => {
  const page = store.pages.current;

  const noCutFiles = !page.files.cutData.files.length;

  return [
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
      disabled: true,
    },
    {
      label: 'New file',
      icon: icons.fileAdd,
      disabled: true,
    },
    {
      label: 'Upload',
      icon: icons.uploadOutline,
      disabled: true,
    },
  ];
};

export const getFileContextMenu = (): IContextMenuData => {
  const page = store.pages.current;

  const containsFile = !!page.files.selected.find(r => r.type !== 'folder');
  const multiple = page.files.selected.length > 1;

  return [
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
    {
      label: 'Rename',
      icon: icons.edit,
      accelerator: 'F2',
      onSelect: async () => {
        const { name } = await store.dialog.show(getRenameFileDialog());

        page.files.rename(page.files.anchorFile, name);
      },
      hidden: multiple,
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
      label: 'Delete',
      icon: icons.delete,
      iconSize: 20,
      accelerator: 'Del',
      disabled: true,
    },
  ];
};

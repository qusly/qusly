import store from '../store';
import { IContextMenuData } from '~/renderer/interfaces';
import { icons } from '~/renderer/constants';

export const getPageContextMenu = (): IContextMenuData => {
  return [
    {
      label: 'Refresh',
      accelerator: 'Ctrl+R',
      icon: icons.refresh,
      onSelect: store.pages.current.files.fetch,
    },
    { type: 'divider' },
    {
      label: 'New folder',
      icon: icons.folderAdd,
      accelerator: 'Ctrl+Shift+N',
    },
    {
      label: 'New file',
      icon: icons.fileAdd,
    },
    { type: 'divider' },
    {
      label: 'Paste',
      icon: icons.paste,
      iconSize: 18,
      onSelect: store.pages.current.files.onPaste,
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
      hidden: !page.files.cutFiles.length || containsFile,
    },
    {
      label: 'Rename',
      icon: icons.edit,
      hidden: multiple,
      accelerator: 'F2',
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
    },
    { type: 'divider' },
    {
      label: 'Delete',
      icon: icons.delete,
      iconSize: 20,
      accelerator: 'Del',
    },
  ];
};

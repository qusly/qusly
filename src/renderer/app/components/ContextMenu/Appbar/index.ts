import { IContextMenuData } from '~/renderer/interfaces';
import store from '~/renderer/app/store';
import { icons } from '~/renderer/constants';
import { Tab } from '~/renderer/app/models';

export const getTabContextMenu = (tab: Tab): IContextMenuData => {
  const tabIndex = store.tabs.list.indexOf(tab);
  const page = store.pages.current;

  return {
    forceIcons: true,
    items: [
      {
        label: 'Close',
        onSelect: () => {
          tab.close();
        },
      },
      {
        label: 'Close others',
        onSelect: () => {
          store.tabs.list.forEach(r => {
            if (r !== tab) {
              r.close();
            }
          });
        },
      },
      {
        label: 'Close to the right',
        onSelect: () => {
          for (let i = tabIndex + 1; i < store.tabs.list.length; i++) {
            store.tabs.list[i].close();
          }
        },
      },
      {
        label: 'Close to the left',
        onSelect: () => {
          for (let i = 0; i < tabIndex; i++) {
            store.tabs.list[i].close();
          }
        },
      },
      {
        label: 'Refresh',
        onSelect: page.files.fetch,
      },
      {
        label: 'Copy path',
        onSelect: page.history.copyToClipboard,
      },
    ],
  };
};

export const getPathViewContextMenu = (): IContextMenuData => {
  const page = store.pages.current;

  return {
    items: [
      {
        label: 'Copy path',
        icon: icons.copy,
        iconSize: 18,
        onSelect: page.history.copyToClipboard,
      },
      { type: 'divider' },
      {
        label: 'Edit path',
        icon: icons.edit,
        onSelect: store.pathView.show,
      },
      {
        label: 'Delete history',
        icon: icons.delete,
        iconSize: 20,
        onSelect: page.history.deleteHistory,
      },
    ],
  };
};

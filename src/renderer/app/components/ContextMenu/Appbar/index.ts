import { IContextMenuData } from '~/renderer/interfaces';
import store from '~/renderer/app/store';
import { icons } from '~/renderer/constants';

export const getPathViewContextMenu = (): IContextMenuData => {
  const page = store.pages.current;

  return [
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
      disabled: true,
    },
    {
      label: 'Delete history',
      icon: icons.delete,
      iconSize: 20,
      onSelect: page.history.deleteHistory,
    },
  ];
};

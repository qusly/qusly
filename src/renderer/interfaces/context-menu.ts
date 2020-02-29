export type IContextMenuData = IContextMenuItem[];

export interface IContextMenuItem {
  type?: 'item' | 'divider';
  label: string;
  accelerator?: string;
  icon?: string;
  iconSize?: number;
  disabled?: boolean;
  hidden?: boolean;
  onSelect?: () => void;
}

export type IContextMenuData = {
  forceIcons?: boolean;
  items: IContextMenuItem[];
};

export interface IContextMenuItem {
  type?: 'item' | 'divider';
  label?: string;
  accelerator?: string;
  icon?: string;
  iconSize?: number;
  disabled?: boolean;
  hidden?: boolean;
  onSelect?: () => void;
}

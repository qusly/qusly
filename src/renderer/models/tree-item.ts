export interface TreeItem {
  _id: string;
  name: string;
  selected?: boolean;
  children: TreeItem[];
}

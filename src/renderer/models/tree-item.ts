export interface TreeItem {
  _id: string;
  name: string;
  selected?: boolean;
  path: string;
  children: TreeItem[];
}

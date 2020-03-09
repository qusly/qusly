export interface ITreeFolder {
  name?: string;
  expanded?: boolean;
  path?: string;
  children?: ITreeFolder[];
}

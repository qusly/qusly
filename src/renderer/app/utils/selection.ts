import { IFile } from '~/interfaces';
import store from '../store';

export const handleSelection = (file: IFile, e: React.MouseEvent) => {
  if (e.button !== 1 && e.button !== 2) {
    const page = store.pages.current;
    const { selected } = file;

    if (e.ctrlKey) {
      file.selected = !selected;
    } else if (e.shiftKey) {
      page.selectGroup(page.files.indexOf(file), page.files.indexOf(page.focusedFile));
    } else {
      page.unselectFiles();
      file.selected = true;
    }

    if (!e.shiftKey) {
      page.focusedFile = file;
    }
  }
}

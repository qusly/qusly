import { Menu, BrowserWindow } from 'electron';

export const getMainMenu = (window: BrowserWindow) => {
  return Menu.buildFromTemplate([
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
        { role: 'quit' },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            if (process.env.ENV === 'dev') {
              window.webContents.reload();
            }
          },
        },
      ],
    },
  ]);
};

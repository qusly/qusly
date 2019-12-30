import { ipcMain, app, Menu } from 'electron';
import { platform } from 'os';
import { config } from 'dotenv';
import { setPassword, getPassword, deletePassword } from 'keytar';

import { getMainMenu } from './menus/main';
import { AppWindow } from './app-window';

app.setName('Qusly');

(process.env as any)['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

ipcMain.setMaxListeners(0);

process.on('uncaughtException', error => {
  console.error(error);
});

if (process.env.ENV === 'dev') {
  config();
}

let appWindow: AppWindow;

app.on('ready', () => {
  appWindow = new AppWindow();

  app.on('window-all-closed', () => {
    if (platform() !== 'darwin') {
      app.quit();
    }
  });

  Menu.setApplicationMenu(getMainMenu(appWindow));
});

ipcMain.handle('set-password', async (e, service, account, password) => {
  await setPassword(service, account, password);
});

ipcMain.handle('get-password', async (e, service, account) => {
  await getPassword(service, account);
});

ipcMain.handle('delete-password', async (e, service, account) => {
  await deletePassword(service, account);
});

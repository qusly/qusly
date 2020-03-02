import 'source-map-support/register';

import { app, Menu, ipcMain } from 'electron';
import { platform } from 'os';
import { config } from 'dotenv';
import { setPassword, getPassword, deletePassword } from 'keytar';

import { getMainMenu } from './menus/main';
import { AppWindow } from './windows';

(process.env as any)['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

ipcMain.setMaxListeners(0);

process.on('uncaughtException', error => {
  console.error(error);
});

if (process.env.ENV === 'dev') {
  config();
}

app.name = 'Qusly';
app.allowRendererProcessReuse = true;

let appWindow: AppWindow;

app.on('ready', () => {
  appWindow = new AppWindow();

  app.on('window-all-closed', () => {
    if (platform() !== 'darwin') {
      app.quit();
    }
  });

  Menu.setApplicationMenu(getMainMenu(appWindow.instance));
});

ipcMain.handle('set-password', async (e, service, account, password) => {
  return await setPassword(service, account, password);
});

ipcMain.handle('get-password', async (e, service, account) => {
  return await getPassword(service, account);
});

ipcMain.handle('delete-password', async (e, service, account) => {
  return await deletePassword(service, account);
});

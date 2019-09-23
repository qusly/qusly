import { ipcMain, app, Menu } from 'electron';
import { resolve } from 'path';
import { homedir, platform } from 'os';
import { config } from 'dotenv';

import { getMainMenu } from './menus/main';
import { AppWindow } from './app-window';

app.setName('Qusly');
app.setPath('userData', resolve(homedir(), '.qusly'));

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

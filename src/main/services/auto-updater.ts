import { autoUpdater } from 'electron-updater';
import { ipcMain, BrowserWindow } from 'electron';

export const runAutoUpdaterService = (window: BrowserWindow) => {
  ipcMain.on('update-install', () => {
    autoUpdater.quitAndInstall();
  });

  ipcMain.on('update-check', () => {
    if (process.env.ENV !== 'dev') {
      autoUpdater.checkForUpdates();
    }
  });

  autoUpdater.on('update-downloaded', ({ version }) => {
    window.webContents.send('update-available', version);
  });
};

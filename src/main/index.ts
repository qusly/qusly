import {
  BrowserWindow,
  app,
  ipcMain,
  IpcMessageEvent,
  Menu,
} from 'electron';
import { join, resolve } from 'path';
import { platform } from 'os';
import { getExtIcon } from 'electron-ext-icon';
import { getMainMenu } from './menus/main';

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (e, argv) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

const createWindow = () => {
  const windowData: Electron.BrowserWindowConstructorOptions = {
    frame: false,
    minWidth: 400,
    minHeight: 450,
    width: 900,
    height: 700,
    show: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      plugins: true,
      nodeIntegration: true,
      contextIsolation: false,
      experimentalFeatures: true,
    },
    icon: resolve(app.getAppPath(), 'static/app-icons/icon.png'),
  };

  const window = new BrowserWindow(windowData);

  Menu.setApplicationMenu(getMainMenu(window));

  if (process.env.ENV === 'dev') {
    window.webContents.openDevTools({ mode: 'right' });
    window.loadURL('http://localhost:4444');
  } else {
    window.loadURL(join('file://', app.getAppPath(), 'build/index.html'));
  }

  window.once('ready-to-show', () => {
    window.show();
  });

  window.webContents.addListener('will-navigate', e => e.preventDefault());

  return window;
};

let mainWindow: BrowserWindow;

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    mainWindow = createWindow();
  }
});

app.on('ready', () => {
  mainWindow = createWindow();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (platform() !== 'darwin') {
    app.quit();
  }
});

ipcMain.on(
  'get-extensions-icons',
  async (e: IpcMessageEvent, exts: string[]) => {
    const icons: { [key: string]: string } = {};

    for (const ext of exts) {
      if (icons[ext] == null) {
        const img = await getExtIcon(ext, { size: 'normal' });
        icons[ext] = img.toDataURL();
      }
    }

    e.sender.send('get-extensions-icons', icons);
  },
);

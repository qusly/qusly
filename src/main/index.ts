import { BrowserWindow, app, ipcMain, IpcMessageEvent, Menu } from 'electron';
import { join, resolve } from 'path';
import { platform } from 'os';
import { getExtIcon } from 'electron-ext-icon';
import { getMainMenu } from './menus/main';
import { getPath } from '~/utils';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { runAutoUpdaterService } from './services/auto-updater';

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
    title: 'Qusly',
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

  const windowDataPath = getPath('window-data.json');

  let windowState: any = {};

  if (existsSync(windowDataPath)) {
    try {
      // Read the last window state from file.
      windowState = JSON.parse(readFileSync(windowDataPath, 'utf8'));
    } catch (e) {
      writeFileSync(windowDataPath, JSON.stringify({}));
    }
  }

  // Merge bounds from the last window state to the current window options.
  if (windowState) {
    window.setBounds({ ...windowState.bounds });
  }

  if (windowState) {
    if (windowState.maximized) {
      window.maximize();
    }
    if (windowState.fullscreen) {
      window.setFullScreen(true);
    }
  }

  // Update window bounds on resize and on move when window is not maximized.
  window.on('resize', () => {
    if (!window.isMaximized()) {
      windowState.bounds = window.getBounds();
    }
  });
  window.on('move', () => {
    if (!window.isMaximized()) {
      windowState.bounds = window.getBounds();
    }
  });

  const resize = () => {
    window.webContents.send('tabs-resize');
  };

  window.on('maximize', resize);
  window.on('restore', resize);
  window.on('unmaximize', resize);

  // Save current window state to file.
  window.on('close', () => {
    windowState.maximized = window.isMaximized();
    windowState.fullscreen = window.isFullScreen();
    writeFileSync(windowDataPath, JSON.stringify(windowState));
  });

  Menu.setApplicationMenu(getMainMenu(window));

  if (process.env.ENV === 'dev') {
    window.webContents.openDevTools({ mode: 'right' });
    window.loadURL('http://localhost:4444/app.html');
  } else {
    window.loadURL(join('file://', app.getAppPath(), 'build/app.html'));
  }

  window.once('ready-to-show', () => {
    window.show();
  });

  window.webContents.addListener('will-navigate', e => e.preventDefault());

  runAutoUpdaterService(window);

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

const getExtensionIcon = async (ext: string) => {
  const img = await getExtIcon(ext, { size: 'normal' });
  return { ext, icon: img.toDataURL() };
}

ipcMain.on(
  'get-extensions-icons',
  async (e: IpcMessageEvent, exts: string[]) => {
    const promises = exts.filter((ext, index) => ext !== '' && exts.indexOf(ext) === index)
      .map(ext => getExtensionIcon(ext));

    const data = await Promise.all(promises);
    const icons: { [key: string]: string } = {};

    for (const { icon, ext } of data) {
      icons[ext] = icon;
    }

    e.sender.send('get-extensions-icons', icons);
  },
);

ipcMain.on(
  'get-extension-icon',
  async (e: IpcMessageEvent, ext: string) => {
    const { icon } = await getExtensionIcon(ext);
    e.sender.send('get-extension-icon', icon);
  },
);

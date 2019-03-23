import { BrowserWindow, app } from 'electron';
import { join } from 'path';
import { platform } from 'os';

const createWindow = () => {
  const windowData: Electron.BrowserWindowConstructorOptions = {
    frame: process.env.ENV === 'dev' || platform() === 'darwin',
    minWidth: 400,
    minHeight: 450,
    width: 900,
    height: 700,
    show: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      plugins: true,
    },
  };

  const window = new BrowserWindow(windowData);

  window.webContents.openDevTools({ mode: 'right' });

  if (process.env.ENV === 'dev') {
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

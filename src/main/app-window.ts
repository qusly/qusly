import { BrowserWindow, app } from 'electron';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';

import { getPath } from '~/utils';
import { runAutoUpdaterService } from './services/auto-updater';

export class AppWindow extends BrowserWindow {
  public constructor() {
    super({
      //frame: false,
      minWidth: 400,
      minHeight: 450,
      width: 900,
      height: 700,
      show: true,
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        plugins: true,
        nodeIntegration: true,
        contextIsolation: false,
      },
      icon: resolve(app.getAppPath(), 'static/app-icons/icon.png'),
    });

    runAutoUpdaterService(this);

    const windowDataPath = getPath('window-data.json');

    let windowState: any = {};

    try {
      // Read the last window state from file.
      windowState = JSON.parse(readFileSync(windowDataPath, 'utf8'));
    } catch (e) {
      writeFileSync(windowDataPath, JSON.stringify({}));
    }

    // Merge bounds from the last window state to the current window options.
    if (windowState) {
      this.setBounds({ ...windowState.bounds });
    }

    if (windowState) {
      if (windowState.maximized) {
        this.maximize();
      }
      if (windowState.fullscreen) {
        this.setFullScreen(true);
      }
    }

    // Update window bounds on resize and on move when window is not maximized.
    this.on('resize', () => {
      if (!this.isMaximized()) {
        windowState.bounds = this.getBounds();
      }
    });

    this.on('move', () => {
      if (!this.isMaximized()) {
        windowState.bounds = this.getBounds();
      }
    });

    // Save current window state to file.
    this.on('close', () => {
      windowState.maximized = this.isMaximized();
      windowState.fullscreen = this.isFullScreen();

      writeFileSync(windowDataPath, JSON.stringify(windowState));
    });

    if (process.env.ENV === 'dev') {
      this.webContents.openDevTools({ mode: 'detach' });
      this.loadURL('http://localhost:4444/app.html');
    } else {
      this.loadURL(join('file://', app.getAppPath(), 'build/app.html'));
    }
  }
}

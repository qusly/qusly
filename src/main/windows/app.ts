import { BrowserWindow, app } from 'electron';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';

import { getPath } from '~/utils';
import { runAutoUpdaterService } from '../services/auto-updater';
import { runMessagingService } from '../services/messaging';
import storage from '../services/storage';
import { ConcurrentClient } from 'qusly-core';

export class AppWindow {
  public instance: BrowserWindow;

  constructor() {
    this.instance = new BrowserWindow({
      // frame: false,
      minWidth: 400,
      minHeight: 450,
      width: 900,
      height: 700,
      show: true,
      titleBarStyle: 'hiddenInset',
      backgroundColor: '#fff',
      webPreferences: {
        plugins: true,
        nodeIntegration: true,
        contextIsolation: false,
        experimentalFeatures: true,
      },
      icon: resolve(app.getAppPath(), 'static/app-icons/icon.png'),
    });

    runAutoUpdaterService(this);
    runMessagingService(this);

    storage.run();

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
      this.instance.setBounds({ ...windowState.bounds });
    }

    if (windowState) {
      if (windowState.maximized) {
        this.instance.maximize();
      }
      if (windowState.fullscreen) {
        this.instance.setFullScreen(true);
      }
    }

    // Update window bounds on resize and on move when window is not maximized.
    this.instance.on('resize', () => {
      if (!this.instance.isMaximized()) {
        windowState.bounds = this.instance.getBounds();
      }
    });

    this.instance.on('move', () => {
      if (!this.instance.isMaximized()) {
        windowState.bounds = this.instance.getBounds();
      }
    });

    // Save current window state to file.
    this.instance.on('close', () => {
      windowState.maximized = this.instance.isMaximized();
      windowState.fullscreen = this.instance.isFullScreen();

      writeFileSync(windowDataPath, JSON.stringify(windowState));
    });

    if (process.env.ENV === 'dev') {
      this.instance.webContents.openDevTools({ mode: 'right' });
      this.instance.loadURL('http://localhost:4444/app.html');
    } else {
      this.instance.loadURL(
        join('file://', app.getAppPath(), 'build/app.html'),
      );
    }

    async () => {
      // const client = new ConcurrentClient(1);
    };
  }
}

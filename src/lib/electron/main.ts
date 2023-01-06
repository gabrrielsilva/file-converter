import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
  const startUrl = `file:\\\\${path.join(__dirname, '../../index.html')}`;

  const window = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  // window.removeMenu();
  window.webContents.openDevTools();
  window.loadURL(startUrl);
}

app.on('ready', async () => createWindow());
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() });

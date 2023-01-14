import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
  const startUrl = `file:\\\\${path.join(__dirname, '../renderer/index.html')}`;

  const window = new BrowserWindow({
    width: 800,
    height: 800,
    autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
    },
  });

  window.loadURL(startUrl);
}

app.on('ready', async () => {
  await import('./convert-file-async');
  createWindow();
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() });

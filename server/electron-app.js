const { app, BrowserWindow, dialog } = require('electron');

// NODE_ENV fix
process.env.NODE_ENV = app.isPackaged ? 'production' : 'development';

// Start web server
require('./index.js');
const URL = 'http://localhost:' + process.env.PORT;

process.on('uncaughtException', function (error) {
  console.error(error);
  dialog.showErrorBox(
    'Runtime Error',
    'Please check the firewall. If there is still a problem, please contact the administrator.'
  );
  app.quit();
});

// Modules to control application life and create native browser window

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
  });

  mainWindow.loadURL(URL);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('render-process-gone', function () {
  console.warn('Renderer process gone.');
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

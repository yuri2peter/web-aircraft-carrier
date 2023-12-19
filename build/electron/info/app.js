const { app, BrowserWindow, dialog } = require("electron");

// NODE_ENV fix
process.env.NODE_ENV = app.isPackaged ? "production" : "development";

// Start web server
require("./dist/main.js");

process.on("uncaughtException", function (error) {
  console.error(error);
  dialog.showErrorBox(
    "Runtime Error",
    error.message ||
      "Try again later. If there is still a problem, please contact the administrator."
  );
  app.quit();
});

// Modules to control application life and create native browser window

function createWindow(URL) {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 760,
    autoHideMenuBar: true,
    // title: "-",
  });

  // mainWindow.on("page-title-updated", (e) => {
  //   e.preventDefault();
  // });

  // Reload Page: Ctrl + Shift + R.
  mainWindow.loadURL(URL);

  // Open the DevTools(Ctrl + Shift + I).
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  await waitUntil(() => process.env._PORT);
  const port = Number(process.env._PORT);
  if (port === -1) {
    console.error("Failed to start server.");
    dialog.showErrorBox(
      "Runtime Error",
      `Failed to start server. Please check port ${process.env.PORT} is available.`
    );
    app.quit();
    return;
  }
  const URL = "http://localhost:" + port;
  createWindow(URL);

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow(URL);
  });
});

app.on("render-process-gone", function () {
  console.warn("Renderer process gone.");
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

/**
 * 等待，直到checker返回true
 * @param checker 检查函数
 * @param interval 检查间隔
 * @param timeout 超时则报错，默认0表示不启用
 * @returns
 */
async function waitUntil(checker, interval = 100, timeout = 0) {
  return new Promise(async (resolve, reject) => {
    const checked = await checker();
    if (checked) {
      resolve();
      return;
    }
    let passed = false;
    const itv = setInterval(async () => {
      const checked = await checker();
      if (checked) {
        clearInterval(itv);
        passed = true;
        resolve();
      }
    }, interval);
    if (timeout) {
      setTimeout(() => {
        if (!passed) {
          clearInterval(itv);
          reject(new Error("Wait timeout."));
        }
      }, timeout);
    }
  });
}

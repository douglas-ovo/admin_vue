import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Tray,
  Menu,
  globalShortcut,
  screen
} from 'electron'
import { release } from 'os'
import path, { join } from 'path'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()
// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'


let __static: string
if (process.env.NODE_ENV !== 'development') {
  __static = join(__dirname, '/renderer/public').replace(/\\/g, '\\\\')
}

let win: BrowserWindow | null = null
let tray: Tray | null = null

const contextMenu = Menu.buildFromTemplate([{
  label: '退出系统',
  click: function () {
    (tray as Tray).destroy()
    app.quit()
  }
}])

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    width: 1280,
    height: 720,
    useContentSize: true,
    // frame: false, // 去除边框
    webPreferences: {
      devTools: true,
      preload: join(__dirname, '../preload/index.cjs'),
      nodeIntegration: false,
      contextIsolation: false,
      webSecurity: false
    },
  })

  Menu.setApplicationMenu(null)

  globalShortcut.register('CommandOrControl+q', function () {
    (win as BrowserWindow).webContents.openDevTools()
  })

  //设置托盘
  if (process.env.NODE_ENV !== 'development') {
    tray = new Tray(path.join(__static, './icon.ico'))
  } else {
    tray = new Tray('./dist/renderer/icon.ico')
  }
  tray.setToolTip('xixi系统')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    (win as BrowserWindow).show();
    // mainWindow.maximize();
    (win as BrowserWindow).focus();
    (win as BrowserWindow).setSkipTaskbar(false)
  })

  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  } else {
    const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
    win.loadURL(url)
  }

  // Test active push message to Renderer-process
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })
  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload: join(__dirname, "../preload/index.cjs"),
    },
  });

  if (app.isPackaged) {
    childWindow.loadFile(join(__dirname, `../renderer/index.html`), {
      hash: `${arg}`,
    })
  } else {
    //Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}/#${arg}`
    childWindow.loadURL(url);
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
});

const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;
let secondaryWindows = [];

function createMainWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize; // Get primary screen size

  // Create the main window
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    frame: false, // No window frame
    fullscreen: true, // Full screen mode
    transparent: false, // Make the background opaque
    webPreferences: {
      nodeIntegration: true, // Allow Node.js integration (if needed)
      preload: path.join(__dirname, 'preload.js'), // Use a preload script
    },
  });

  // Load the HTML file
  mainWindow.loadURL('http://localhost:3000');

  // Create black full-screen windows for secondary monitors
  const displays = screen.getAllDisplays();

  displays.forEach(display => {
    if (display.id !== screen.getPrimaryDisplay().id) {
      // Create a new window on each secondary monitor
      let blackWindow = new BrowserWindow({
        width: display.workAreaSize.width,
        height: display.workAreaSize.height,
        x: display.bounds.x,
        y: display.bounds.y,
        frame: false, // No window frame
        fullscreen: true, // Full screen mode
        backgroundColor: '#000000', // Black background
        transparent: false, // Make it opaque
      });

      blackWindow.loadURL('data:text/html,<html><body style="background-color: black;"></body></html>');

      secondaryWindows.push(blackWindow); // Keep track of the black windows
    }
  });

  // When the main window is closed, clean up
  mainWindow.on('closed', () => {
    mainWindow = null;

    // Check if the secondary windows exist before closing them
    secondaryWindows.forEach(window => {
      if (!window.isDestroyed()) {
        window.close();
      }
    });
    secondaryWindows = [];
  });
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
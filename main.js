import { app, BrowserWindow } from 'electron/main';
import path from 'node:path';
import Connection from './src/connection.js';

const dirname = process.cwd();

const con = new Connection(path.join(dirname, 'db/database.db'));

const statement = con.getInstance();

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(dirname, 'src/preload.js')
        }
    });

    win.loadFile('public/index.html');
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
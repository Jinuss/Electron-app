/**
 *  主进程
 */
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const si = require('systeminformation');
si.system().then(data => console.log(data));
const createWindow = () => {
    const win = new BrowserWindow({
        title: "MonitorApp",
        width: 800,
        height: 600,
        // frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js') //预加载脚本
        }
    })

    // 创建两个不同的菜单：一个带有工具栏，一个不带工具栏
    const menuWithToolbar = Menu.buildFromTemplate([
        {
            label: '文件',
            submenu: [
                { label: '打开' },
                { label: '保存' }
            ]
        },
        {
            label: '编辑',
            submenu: [
                { label: '复制' },
                { label: '粘贴' }
            ]
        }
    ]);

    const menuWithoutToolbar = Menu.buildFromTemplate([]);

    // 设置初始菜单为带有工具栏的菜单
    // win.setMenu(menuWithToolbar);

    // 在需要时切换菜单
    function toggleToolbar(showToolbar) {
        const menu = showToolbar ? menuWithToolbar : menuWithoutToolbar;
        // win.setMenu(menu);
    }

    // 示例：在某个事件触发时隐藏工具栏
    setTimeout(() => {
        toggleToolbar(false); // 隐藏工具栏
    }, 5000);
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

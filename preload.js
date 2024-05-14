const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: require('electron').ipcRenderer,
    desktop: true
})

window.addEventListener('DOMContentLoaded', () => {
    console.log(process.versions)
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }
    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})
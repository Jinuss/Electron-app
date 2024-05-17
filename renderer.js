console.log(window.electron)
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
  const filePath = await window.electron.openFile()
  filePathElement.innerText = filePath
})
process.stdout.setEncoding('utf8');
const { exec } = require('child_process');

// 设置环境变量
const options = {
  cwd: 'D:\\1Awork\\electron\\box\\scripts',
  env: Object.assign({}, process.env, {
    // 添加/修改需要的环境变量
    PATH: `${process.env.PATH};D:\\1Awork\\electron\\box\\scripts'`
  })
};

// 执行批处理脚本
exec('copyOpenlayers.bat', options, (error, stdout, stderr) => {
  if (error) {
    console.error(`错误： ${JSON.stringify(error)}`);
    return;
  }
  // process.exit(0);

  return
});
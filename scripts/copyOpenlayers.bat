@echo off
chcp 65001 >nul
setlocal

rem 设置源文件夹和目标文件夹路径
set "source=D:\1Awork\vuepress-theme-vdoing\docs\Demo\openlayers"
set "destination=D:\1Awork\electron\box\dist"

echo 源文件夹: %source%
echo 目标文件夹: %destination%

rem 检查源文件夹是否存在
if not exist "%source%" (
    echo 错误: 源文件夹 %source% 不存在
    goto end
)

rem 创建目标文件夹（如果不存在）
if not exist "%destination%" (
    mkdir "%destination%"
    if %errorlevel% neq 0 (
        echo 错误: 无法创建目标文件夹 %destination%
        goto end
    )
    echo 创建了目标文件夹: %destination%
)

rem 使用 xcopy 复制文件夹内容并强制替换同名文件
xcopy "%source%\*" "%destination%\" /E /I /H /Y

rem 检查 xcopy 命令的错误级别
if %errorlevel% neq 0 (
    echo 错误: 复制过程中出现问题
    goto end
)

echo 文件夹复制完成

:end
pause
endlocal

exit
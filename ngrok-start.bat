@echo off

echo 正在启动 ngrok 服务...
echo 请确保已经安装了 ngrok: https://ngrok.com/download

echo 1. 首先启动本地服务器
echo 2. 然后启动 ngrok 进行端口转发

REM 启动本地服务器
start "Local Server" cmd /c "node server.js"

REM 等待2秒让服务器启动
timeout /t 2 > nul

REM 启动 ngrok 转发 3001 端口
start "ngrok" cmd /c "ngrok http 3001"

echo 服务启动中，请稍候...
echo 本地服务器地址: http://localhost:3001
echo ngrok 公网地址将在打开的窗口中显示
echo 请将 ngrok 公网地址配置到前端设置中

echo 按任意键退出...
pause > nul
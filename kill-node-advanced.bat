@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    Утилита завершения Node.js процессов
echo ========================================
echo.

:menu
echo Выберите действие:
echo 1. Завершить все Node.js процессы
echo 2. Завершить процессы на порту 3000
echo 3. Завершить процессы на порту 3001
echo 4. Показать активные Node.js процессы
echo 5. Завершить все процессы разработки
echo 6. Выход
echo.
set /p choice="Введите номер (1-6): "

if "%choice%"=="1" goto kill_all
if "%choice%"=="2" goto kill_port_3000
if "%choice%"=="3" goto kill_port_3001
if "%choice%"=="4" goto show_processes
if "%choice%"=="5" goto kill_dev
if "%choice%"=="6" goto exit
goto menu

:kill_all
echo.
echo Завершение всех Node.js процессов...
taskkill /f /im node.exe 2>nul
taskkill /f /im npm.cmd 2>nul
taskkill /f /im yarn.cmd 2>nul
echo Готово!
goto end

:kill_port_3000
echo.
echo Завершение процессов на порту 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do (
    taskkill /f /pid %%a 2>nul
)
echo Готово!
goto end

:kill_port_3001
echo.
echo Завершение процессов на порту 3001...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001') do (
    taskkill /f /pid %%a 2>nul
)
echo Готово!
goto end

:show_processes
echo.
echo Активные Node.js процессы:
tasklist /fi "imagename eq node.exe" 2>nul
echo.
echo Активные NPM процессы:
tasklist /fi "imagename eq npm.cmd" 2>nul
echo.
echo Активные Yarn процессы:
tasklist /fi "imagename eq yarn.cmd" 2>nul
goto end

:kill_dev
echo.
echo Завершение всех процессов разработки...
taskkill /f /im node.exe 2>nul
taskkill /f /im npm.cmd 2>nul
taskkill /f /im yarn.cmd 2>nul
taskkill /f /im webpack.cmd 2>nul
taskkill /f /im react-scripts.cmd 2>nul
echo Готово!
goto end

:end
echo.
echo Нажмите любую клавишу для возврата в меню...
pause >nul
cls
goto menu

:exit
echo До свидания!
pause
exit /b 0 
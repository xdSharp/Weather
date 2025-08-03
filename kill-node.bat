@echo off
echo Завершение всех Node.js процессов...

REM Завершаем все процессы node.exe
taskkill /f /im node.exe 2>nul
if %errorlevel% equ 0 (
    echo Node.js процессы успешно завершены!
) else (
    echo Node.js процессы не найдены или уже завершены.
)

REM Завершаем все процессы npm
taskkill /f /im npm.cmd 2>nul
if %errorlevel% equ 0 (
    echo NPM процессы успешно завершены!
) else (
    echo NPM процессы не найдены или уже завершены.
)

REM Завершаем все процессы yarn
taskkill /f /im yarn.cmd 2>nul
if %errorlevel% equ 0 (
    echo Yarn процессы успешно завершены!
) else (
    echo Yarn процессы не найдены или уже завершены.
)

echo.
echo Все процессы завершены. Нажмите любую клавишу для выхода...
pause >nul 
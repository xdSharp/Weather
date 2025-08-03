Write-Host "Завершение всех Node.js процессов..." -ForegroundColor Yellow

# Завершаем все процессы node.exe
try {
    $nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
    if ($nodeProcesses) {
        Stop-Process -Name "node" -Force
        Write-Host "Node.js процессы успешно завершены!" -ForegroundColor Green
    } else {
        Write-Host "Node.js процессы не найдены." -ForegroundColor Gray
    }
} catch {
    Write-Host "Ошибка при завершении Node.js процессов: $($_.Exception.Message)" -ForegroundColor Red
}

# Завершаем все процессы npm
try {
    $npmProcesses = Get-Process -Name "npm" -ErrorAction SilentlyContinue
    if ($npmProcesses) {
        Stop-Process -Name "npm" -Force
        Write-Host "NPM процессы успешно завершены!" -ForegroundColor Green
    } else {
        Write-Host "NPM процессы не найдены." -ForegroundColor Gray
    }
} catch {
    Write-Host "Ошибка при завершении NPM процессов: $($_.Exception.Message)" -ForegroundColor Red
}

# Завершаем все процессы yarn
try {
    $yarnProcesses = Get-Process -Name "yarn" -ErrorAction SilentlyContinue
    if ($yarnProcesses) {
        Stop-Process -Name "yarn" -Force
        Write-Host "Yarn процессы успешно завершены!" -ForegroundColor Green
    } else {
        Write-Host "Yarn процессы не найдены." -ForegroundColor Gray
    }
} catch {
    Write-Host "Ошибка при завершении Yarn процессов: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Все процессы завершены. Нажмите любую клавишу для выхода..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 
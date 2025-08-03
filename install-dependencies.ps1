Write-Host "Installing Python, pip, and Git on Windows..." -ForegroundColor Green
Write-Host ""

# Check if winget is available
try {
    $wingetVersion = winget --version
    Write-Host "winget is available: $wingetVersion" -ForegroundColor Cyan
} catch {
    Write-Host "winget is not available. Please install manually:" -ForegroundColor Red
    Write-Host "1. Python: https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host "2. Git: https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Install Python
Write-Host "Installing Python..." -ForegroundColor Yellow
try {
    winget install Python.Python.3.11 --accept-source-agreements --accept-package-agreements
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Trying to install latest Python version..." -ForegroundColor Yellow
        winget install Python.Python --accept-source-agreements --accept-package-agreements
    }
} catch {
    Write-Host "Error installing Python. Please install manually from https://www.python.org/downloads/" -ForegroundColor Red
}

# Install Git
Write-Host "Installing Git..." -ForegroundColor Yellow
try {
    winget install Git.Git --accept-source-agreements --accept-package-agreements
} catch {
    Write-Host "Error installing Git. Please install manually from https://git-scm.com/download/win" -ForegroundColor Red
}

Write-Host ""
Write-Host "Installation completed!" -ForegroundColor Green
Write-Host "Please restart PowerShell and run the verification commands:" -ForegroundColor Cyan
Write-Host ""
Write-Host "python --version" -ForegroundColor White
Write-Host "pip --version" -ForegroundColor White
Write-Host "git --version" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit" 
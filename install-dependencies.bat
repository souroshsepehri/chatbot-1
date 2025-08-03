@echo off
echo Installing Python, pip, and Git on Windows...
echo.

REM Check if winget is available
winget --version >nul 2>&1
if %errorlevel% neq 0 (
    echo winget is not available. Please install manually:
    echo 1. Python: https://www.python.org/downloads/
    echo 2. Git: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo winget is available. Starting installation...
echo.

REM Install Python
echo Installing Python...
winget install Python.Python.3.11 --accept-source-agreements --accept-package-agreements
if %errorlevel% neq 0 (
    echo Trying to install latest Python version...
    winget install Python.Python --accept-source-agreements --accept-package-agreements
)

REM Install Git
echo Installing Git...
winget install Git.Git --accept-source-agreements --accept-package-agreements

echo.
echo Installation completed!
echo Please restart PowerShell and run the verification commands:
echo.
echo python --version
echo pip --version
echo git --version
echo.
pause 
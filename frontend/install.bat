@echo off
echo Installing ChatBot Frontend Dependencies...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not available.
    echo Please ensure Node.js is properly installed.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo npm version:
npm --version
echo.

echo Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies.
    pause
    exit /b 1
)

echo.
echo Dependencies installed successfully!
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo Then open http://localhost:3000 in your browser.
echo.
pause 
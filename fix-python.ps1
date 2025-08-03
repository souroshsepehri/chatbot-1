Write-Host "Python and pip Installation Diagnostic Tool" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""

# Check various Python commands
$pythonCommands = @("python", "python3", "py")
$pipCommands = @("pip", "pip3")

Write-Host "Checking Python installation..." -ForegroundColor Yellow
$pythonFound = $false
$pythonPath = ""

foreach ($cmd in $pythonCommands) {
    try {
        $result = & $cmd --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Python found: $cmd --version" -ForegroundColor Green
            Write-Host "  Output: $result" -ForegroundColor Cyan
            $pythonFound = $true
            $pythonPath = $cmd
            break
        }
    } catch {
        Write-Host "✗ $cmd not found" -ForegroundColor Red
    }
}

if (-not $pythonFound) {
    Write-Host ""
    Write-Host "❌ Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Python manually:" -ForegroundColor Yellow
    Write-Host "1. Go to https://www.python.org/downloads/" -ForegroundColor Cyan
    Write-Host "2. Download Python 3.11 or later" -ForegroundColor Cyan
    Write-Host "3. During installation, CHECK 'Add Python to PATH'" -ForegroundColor Cyan
    Write-Host "4. Also CHECK 'Install pip'" -ForegroundColor Cyan
    Write-Host "5. Restart PowerShell after installation" -ForegroundColor Cyan
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Checking pip installation..." -ForegroundColor Yellow
$pipFound = $false

# Try direct pip commands
foreach ($cmd in $pipCommands) {
    try {
        $result = & $cmd --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ pip found: $cmd --version" -ForegroundColor Green
            Write-Host "  Output: $result" -ForegroundColor Cyan
            $pipFound = $true
            break
        }
    } catch {
        Write-Host "✗ $cmd not found" -ForegroundColor Red
    }
}

# Try pip through Python
if (-not $pipFound) {
    try {
        $result = & $pythonPath -m pip --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ pip found: $pythonPath -m pip --version" -ForegroundColor Green
            Write-Host "  Output: $result" -ForegroundColor Cyan
            $pipFound = $true
        }
    } catch {
        Write-Host "✗ pip not found through Python" -ForegroundColor Red
    }
}

if (-not $pipFound) {
    Write-Host ""
    Write-Host "❌ pip is not working" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try these solutions:" -ForegroundColor Yellow
    Write-Host "1. Reinstall Python with 'Add Python to PATH' checked" -ForegroundColor Cyan
    Write-Host "2. Use: $pythonPath -m pip instead of pip" -ForegroundColor Cyan
    Write-Host "3. Add Python Scripts folder to PATH manually" -ForegroundColor Cyan
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "✅ Python and pip are working correctly!" -ForegroundColor Green
Write-Host ""
Write-Host "You can now install the chatbot dependencies:" -ForegroundColor Cyan
Write-Host "cd backend" -ForegroundColor White
if ($pipFound -and $pipCommands -contains "pip") {
    Write-Host "pip install -r requirements.txt" -ForegroundColor White
} else {
    Write-Host "$pythonPath -m pip install -r requirements.txt" -ForegroundColor White
}
Write-Host ""
Read-Host "Press Enter to exit" 
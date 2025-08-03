# Docker Run Script for Chatbot
# This script helps you set up and run the chatbot using Docker

Write-Host "🐳 Chatbot Docker Setup" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan

# Check if Docker is installed
try {
    docker --version | Out-Null
    Write-Host "✅ Docker is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if Docker is running
try {
    docker info | Out-Null
    Write-Host "✅ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file from template..." -ForegroundColor Yellow
    if (Test-Path "env.example") {
        Copy-Item "env.example" ".env"
        Write-Host "⚠️  Please edit the .env file and add your OpenAI API key before continuing." -ForegroundColor Yellow
        Write-Host "   You can open it with: notepad .env" -ForegroundColor White
        $response = Read-Host "Press Enter when you've added your API key, or 'n' to cancel"
        if ($response -eq 'n') {
            exit 0
        }
    } else {
        Write-Host "❌ env.example file not found. Please create a .env file manually." -ForegroundColor Red
        exit 1
    }
}

# Check if OPENAI_API_KEY is set
$envContent = Get-Content ".env" -ErrorAction SilentlyContinue
if ($envContent -and ($envContent | Select-String "OPENAI_API_KEY=your_openai_api_key_here")) {
    Write-Host "⚠️  Please update your OpenAI API key in the .env file before continuing." -ForegroundColor Yellow
    $response = Read-Host "Press Enter when you've updated your API key, or 'n' to cancel"
    if ($response -eq 'n') {
        exit 0
    }
}

Write-Host "🚀 Starting Docker services..." -ForegroundColor Green

# Build and start services
try {
    docker-compose up --build
} catch {
    Write-Host "❌ Failed to start Docker services. Error: $_" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Services started successfully!" -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend API: http://localhost:8000" -ForegroundColor Cyan
Write-Host "📚 API Docs: http://localhost:8000/docs" -ForegroundColor Cyan 
#!/bin/bash

# Docker Run Script for Chatbot
# This script helps you set up and run the chatbot using Docker

echo "🐳 Chatbot Docker Setup"
echo "========================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker."
    exit 1
fi

echo "✅ Docker is installed and running"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    if [ -f "env.example" ]; then
        cp env.example .env
        echo "⚠️  Please edit the .env file and add your OpenAI API key before continuing."
        echo "   You can open it with: nano .env or your preferred editor"
        read -p "Press Enter when you've added your API key, or 'n' to cancel: " response
        if [ "$response" = "n" ]; then
            exit 0
        fi
    else
        echo "❌ env.example file not found. Please create a .env file manually."
        exit 1
    fi
fi

# Check if OPENAI_API_KEY is set
if grep -q "OPENAI_API_KEY=your_openai_api_key_here" .env; then
    echo "⚠️  Please update your OpenAI API key in the .env file before continuing."
    read -p "Press Enter when you've updated your API key, or 'n' to cancel: " response
    if [ "$response" = "n" ]; then
        exit 0
    fi
fi

echo "🚀 Starting Docker services..."

# Build and start services
if docker-compose up --build; then
    echo "✅ Services started successfully!"
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:8000"
    echo "📚 API Docs: http://localhost:8000/docs"
else
    echo "❌ Failed to start Docker services."
    exit 1
fi 
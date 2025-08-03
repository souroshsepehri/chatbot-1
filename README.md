# ChatBot Project

A complete chatbot solution with a FastAPI backend and Next.js frontend, featuring Persian language support, RTL layout, and intelligent response handling.

## 🚀 Features

### Backend (FastAPI)
- **Modular Architecture**: Clean separation of concerns
- **FAQ System**: Local knowledge base with exact match lookups
- **GPT-4 Integration**: OpenAI API for dynamic responses
- **Response Quality Check**: Filters vague or overly long responses
- **Fallback Handling**: Persian fallback messages for unanswered questions
- **CORS Support**: Configured for frontend integration
- **Comprehensive Logging**: Tracks unanswered questions

### Frontend (Next.js 14)
- **Floating Chat Widget**: Fixed position in bottom-left corner
- **RTL Support**: Full right-to-left layout support
- **Persian Language**: Native Persian font (Vazir) and text direction
- **Real-time Chat**: Live communication with backend API
- **Message Types**: User, bot, and fallback message styling
- **Auto-scroll**: Automatically scrolls to latest messages
- **Loading States**: Visual feedback during API calls
- **Responsive Design**: Works on desktop and mobile

## 📁 Project Structure

```
chatbot/
├── backend/                    # FastAPI Backend
│   ├── main.py                # FastAPI application
│   ├── routers/
│   │   └── chat.py           # Chat endpoint router
│   ├── services/
│   │   ├── gpt.py            # GPT-4 API service
│   │   ├── faq.py            # FAQ lookup service
│   │   └── fallback.py       # Fallback response service
│   ├── utils/
│   │   └── response_check.py # Response quality checker
│   ├── data/
│   │   ├── custom_faq.json   # Local knowledge base
│   │   └── fallback_logs.txt # Unanswered questions log
│   ├── .env                  # Environment variables
│   ├── requirements.txt      # Python dependencies
│   └── README.md            # Backend documentation
│
└── frontend/                   # Next.js Frontend
    ├── src/
    │   ├── app/
    │   │   ├── globals.css   # Global styles with Tailwind
    │   │   ├── layout.tsx    # Root layout with RTL support
    │   │   └── page.tsx      # Main page with ChatWidget
    │   ├── components/
    │   │   └── ChatWidget.tsx # Main chat widget component
    │   └── store/
    │       └── chatStore.ts  # Zustand state management
    ├── package.json          # Dependencies
    ├── tailwind.config.ts   # Tailwind configuration
    ├── tsconfig.json        # TypeScript configuration
    ├── next.config.js       # Next.js configuration
    └── README.md           # Frontend documentation
```

## 🛠️ Quick Start

### Option 1: Docker (Recommended)
The easiest way to run the chatbot on any device:

1. **Prerequisites:**
   - Docker and Docker Compose installed
   - OpenAI API key

2. **Quick Setup:**
   ```bash
   # Windows
   .\docker-run.ps1
   
   # Linux/Mac
   ./docker-run.sh
   
   # Or manually:
   cp env.example .env
   # Edit .env and add your OpenAI API key
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

For detailed Docker instructions, see [DOCKER.md](DOCKER.md).

### Option 2: Manual Setup

#### Prerequisites
- Python 3.8+ (for backend)
- Node.js 18+ (for frontend)
- OpenAI API key

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment**:
   - Edit `.env` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the backend server**:
   ```bash
   python main.py
   ```
   
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies** (choose one):
   ```bash
   # Using npm
   npm install
   
   # Using the provided scripts
   ./install.ps1    # PowerShell
   install.bat      # Windows Batch
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:3000`

## 🔧 API Endpoints

### Chat Endpoint
- **POST** `/chat/`
- **Body**: `{"message": "Your question here"}`
- **Response**: `{"response": "Answer", "source": "faq|gpt|fallback"}`

### Health Check
- **GET** `/health` - Global health check
- **GET** `/chat/health` - Chat service health check

### FAQ Management
- **GET** `/chat/faqs` - Get all FAQs
- **POST** `/chat/faqs` - Add new FAQ

### Logs
- **GET** `/chat/logs?limit=10` - Get recent fallback logs

## 🎨 Frontend Features

### ChatWidget Component
- **Fixed Positioning**: Bottom-left corner with z-index
- **Toggle Functionality**: Expand/collapse chat interface
- **Message Display**: Different styles for user, bot, and fallback messages
- **Input Handling**: Form submission with Enter key support
- **Loading States**: Visual feedback during API calls
- **Auto-scroll**: Smooth scrolling to latest messages
- **Error Handling**: Graceful error messages in Persian

### Message Types
1. **User Messages**: Blue background, right-aligned
2. **Bot Messages**: Gray background, left-aligned
3. **Fallback Messages**: Yellow background, special styling

### RTL Support
- **Text Direction**: Right-to-left text flow
- **Layout Direction**: RTL-aware flexbox layouts
- **Font Family**: Vazir font for Persian text
- **Time Format**: Persian locale for timestamps

## 🔄 Response Flow

1. **FAQ Check**: Searches `custom_faq.json` for exact match (case-insensitive)
2. **GPT-4**: If not found in FAQ, sends to GPT-4 API
3. **Quality Check**: Analyzes GPT response for vagueness (>100 words, uncertain phrases)
4. **Fallback**: If vague, logs question and returns Persian fallback message
5. **Response**: Returns appropriate answer with source indicator

## 🎯 Usage Examples

### Testing the Chat

1. **Open the frontend** at `http://localhost:3000`
2. **Click the chat icon** in the bottom-left corner
3. **Try these sample questions**:
   - "What is your name?" (FAQ response)
   - "Tell me a joke" (FAQ response)
   - "What is the weather like?" (FAQ response)
   - "Explain quantum physics" (GPT response)
   - "What should I do with my life?" (Fallback response)

### Adding Custom FAQs

```bash
curl -X POST "http://localhost:8000/chat/faqs" \
     -H "Content-Type: application/json" \
     -d '{"question": "How do I reset my password?", "answer": "Go to settings and click reset password."}'
```

## 🚀 Deployment

### Backend Deployment
- **Docker**: Use the provided Dockerfile
- **Heroku**: Deploy with Procfile
- **AWS**: Use Elastic Beanstalk or Lambda
- **Vercel**: Serverless deployment

### Frontend Deployment
- **Vercel** (Recommended): Automatic deployment from GitHub
- **Netlify**: Static site deployment
- **AWS Amplify**: Full-stack deployment

## 🔧 Configuration

### Backend Configuration
- **GPT Model**: Configurable in `services/gpt.py`
- **Max Tokens**: Adjustable response length
- **Temperature**: Control response creativity
- **FAQ Database**: Editable JSON file

### Frontend Configuration
- **API URL**: Configurable in environment variables
- **Styling**: Customizable via Tailwind config
- **Font**: Vazir font for Persian text
- **Colors**: Theme colors in Tailwind config

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Error**:
   - Ensure backend is running on port 8000
   - Check CORS configuration
   - Verify API key in `.env`

2. **Frontend Build Errors**:
   - Run `npm install` to install dependencies
   - Check Node.js version (18+ required)
   - Clear npm cache if needed

3. **RTL Display Issues**:
   - Verify browser RTL support
   - Check font loading
   - Ensure proper CSS direction

4. **API Response Issues**:
   - Check OpenAI API key
   - Verify network connectivity
   - Review backend logs

### Performance Optimization

1. **Backend**:
   - Implement response caching
   - Optimize database queries
   - Use connection pooling

2. **Frontend**:
   - Enable code splitting
   - Optimize bundle size
   - Implement lazy loading

## 📝 Development

### Adding Features

1. **Backend**:
   - Add new services in `services/` directory
   - Create new routers in `routers/` directory
   - Update main.py to include new routes

2. **Frontend**:
   - Add new components in `src/components/`
   - Update state management in `src/store/`
   - Modify styling in Tailwind config

### Testing

```bash
# Backend testing
cd backend
python -m pytest

# Frontend testing
cd frontend
npm run test
npm run lint
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation in each directory
- Review the troubleshooting section

---

**Happy Chatting! 🎉** 
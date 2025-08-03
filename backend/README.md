# ChatBot API

A modular FastAPI chatbot with FAQ, GPT-4, and fallback handling capabilities.

## Features

- **FAQ System**: Local knowledge base with exact match lookups
- **GPT-4 Integration**: OpenAI API integration for dynamic responses
- **Response Quality Check**: Filters out vague or overly long responses
- **Fallback Handling**: Persian fallback message for unanswered questions
- **CORS Support**: Configured for frontend integration
- **Modular Architecture**: Clean separation of concerns

## Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── routers/
│   └── chat.py            # Chat endpoint router
├── services/
│   ├── gpt.py             # GPT-4 API service
│   ├── faq.py             # FAQ lookup service
│   └── fallback.py        # Fallback response service
├── utils/
│   └── response_check.py  # Response quality checker
├── data/
│   ├── custom_faq.json    # Local knowledge base
│   └── fallback_logs.txt  # Unanswered questions log
├── .env                   # Environment variables
└── requirements.txt       # Python dependencies
```

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure Environment**:
   - Copy `.env` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the Application**:
   ```bash
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

## API Endpoints

### Chat Endpoint
- **POST** `/chat/`
- **Body**: `{"message": "Your question here"}`
- **Response**: `{"response": "Answer", "source": "faq|gpt|fallback"}`

### Health Check
- **GET** `/health` - Global health check
- **GET** `/chat/health` - Chat service health check

### FAQ Management
- **GET** `/chat/faqs` - Get all FAQs
- **POST** `/chat/faqs` - Add new FAQ (body: `{"question": "...", "answer": "..."}`)

### Logs
- **GET** `/chat/logs?limit=10` - Get recent fallback logs

## Usage Examples

### Basic Chat Request
```bash
curl -X POST "http://localhost:8000/chat/" \
     -H "Content-Type: application/json" \
     -d '{"message": "What is your name?"}'
```

### Add FAQ
```bash
curl -X POST "http://localhost:8000/chat/faqs" \
     -H "Content-Type: application/json" \
     -d '{"question": "How do I reset my password?", "answer": "Go to settings and click reset password."}'
```

## Response Flow

1. **FAQ Check**: Searches `custom_faq.json` for exact match (case-insensitive)
2. **GPT-4**: If not found in FAQ, sends to GPT-4 API
3. **Quality Check**: Analyzes GPT response for vagueness (>100 words, uncertain phrases)
4. **Fallback**: If vague, logs question and returns Persian fallback message
5. **Response**: Returns appropriate answer with source indicator

## Configuration

### GPT Service
- Model: GPT-4 (configurable)
- Max tokens: 150 (configurable)
- Temperature: 0.7 (configurable)

### Response Quality Check
- Vague phrases detection
- Word count limit: 100 words
- Hedging words analysis

### CORS
- Allowed origin: `http://localhost:3000`
- All methods and headers allowed

## Error Handling

- Graceful handling of API failures
- Fallback responses for service errors
- Comprehensive logging of unanswered questions
- Input validation and sanitization

## Development

### Adding New Features
1. Create new service in `services/` directory
2. Add router endpoints in `routers/` directory
3. Update main.py to include new routers
4. Add tests and documentation

### Testing
```bash
# Install test dependencies
pip install pytest httpx

# Run tests
pytest
```

## License

MIT License 
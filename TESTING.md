# Testing Guide for ChatBot Project

This guide covers all the different ways to test your chatbot application, from manual testing to automated testing.

## 🚀 Quick Start Testing

### 1. Manual Testing (Recommended for beginners)

#### Start Both Services:
```bash
# Terminal 1 - Backend
cd backend
pip install -r requirements.txt
python main.py

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev
```

#### Test the Application:
1. Open `http://localhost:3000` in your browser
2. Click the chat icon in the bottom-left corner
3. Try these test messages:
   - "What is your name?" (FAQ response)
   - "Tell me a joke" (FAQ response) 
   - "What is the weather like?" (FAQ response)
   - "Explain quantum physics" (GPT response)
   - "What should I do with my life?" (Fallback response)

## 🧪 Automated Testing

### Backend Testing

#### Install Test Dependencies:
```bash
cd backend
pip install -r requirements-test.txt
```

#### Run Backend Tests:
```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run specific test file
pytest test_main.py

# Run with coverage
pytest --cov=.

# Run tests and generate HTML coverage report
pytest --cov=. --cov-report=html
```

#### Backend Test Coverage:
- ✅ Health check endpoints
- ✅ Chat endpoint functionality
- ✅ FAQ management
- ✅ Error handling
- ✅ Input validation

### Frontend Testing

#### Install Test Dependencies:
```bash
cd frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

#### Run Frontend Tests:
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- ChatWidget.test.tsx
```

#### Frontend Test Coverage:
- ✅ Component rendering
- ✅ User interactions
- ✅ API integration
- ✅ Error handling
- ✅ Loading states

## 🔧 API Testing

### Using curl (Command Line)

#### Basic Chat Testing:
```bash
# Test chat endpoint
curl -X POST "http://localhost:8000/chat/" \
     -H "Content-Type: application/json" \
     -d '{"message": "What is your name?"}'

# Expected response:
# {"response": "My name is ChatBot!", "source": "faq"}
```

#### Health Checks:
```bash
# Global health check
curl http://localhost:8000/health

# Chat service health check
curl http://localhost:8000/chat/health
```

#### FAQ Management:
```bash
# Get all FAQs
curl http://localhost:8000/chat/faqs

# Add new FAQ
curl -X POST "http://localhost:8000/chat/faqs" \
     -H "Content-Type: application/json" \
     -d '{"question": "How do I test this?", "answer": "Follow this guide!"}'
```

#### Logs:
```bash
# Get recent fallback logs
curl "http://localhost:8000/chat/logs?limit=5"
```

### Using Postman or Insomnia

1. **Import these requests:**
   - `POST http://localhost:8000/chat/`
   - `GET http://localhost:8000/health`
   - `GET http://localhost:8000/chat/faqs`
   - `POST http://localhost:8000/chat/faqs`

2. **Test different message types:**
   - FAQ questions: "What is your name?"
   - GPT questions: "Explain machine learning"
   - Fallback questions: "What should I do with my life?"

## 🎯 Test Scenarios

### 1. FAQ Response Testing
```bash
curl -X POST "http://localhost:8000/chat/" \
     -H "Content-Type: application/json" \
     -d '{"message": "What is your name?"}'
```
**Expected:** `{"response": "My name is ChatBot!", "source": "faq"}`

### 2. GPT Response Testing
```bash
curl -X POST "http://localhost:8000/chat/" \
     -H "Content-Type: application/json" \
     -d '{"message": "Explain quantum physics"}'
```
**Expected:** `{"response": "...", "source": "gpt"}`

### 3. Fallback Response Testing
```bash
curl -X POST "http://localhost:8000/chat/" \
     -H "Content-Type: application/json" \
     -d '{"message": "What should I do with my life?"}'
```
**Expected:** `{"response": "متاسفانه نمی‌توانم به این سوال پاسخ دهم...", "source": "fallback"}`

### 4. Error Handling Testing
```bash
# Empty message
curl -X POST "http://localhost:8000/chat/" \
     -H "Content-Type: application/json" \
     -d '{"message": ""}'

# Missing message field
curl -X POST "http://localhost:8000/chat/" \
     -H "Content-Type: application/json" \
     -d '{}'
```

## 🔍 Frontend Component Testing

### Manual Component Testing:
1. **Open browser developer tools**
2. **Test responsive design** by resizing the window
3. **Test RTL layout** by changing browser language to Persian
4. **Test accessibility** using browser accessibility tools
5. **Test keyboard navigation** (Tab, Enter, Escape keys)

### Visual Testing:
1. **Check chat widget positioning** (bottom-left corner)
2. **Verify message styling** (user vs bot vs fallback)
3. **Test loading animations**
4. **Check auto-scroll behavior**
5. **Verify Persian font rendering**

## 🐛 Debugging Tests

### Backend Debugging:
```bash
# Run tests with print statements
pytest -s

# Run specific test with debugger
pytest test_main.py::test_chat_endpoint_faq -s

# Check logs
tail -f backend/data/fallback_logs.txt
```

### Frontend Debugging:
```bash
# Run tests with console output
npm test -- --verbose

# Debug specific test
npm test -- --testNamePattern="renders chat toggle button"
```

## 📊 Performance Testing

### Backend Performance:
```bash
# Install Apache Bench
# On Windows: Download from Apache website
# On Mac: brew install httpd
# On Linux: sudo apt-get install apache2-utils

# Test API performance
ab -n 100 -c 10 -H "Content-Type: application/json" \
   -p test_data.json http://localhost:8000/chat/
```

### Frontend Performance:
```bash
# Build and analyze bundle
cd frontend
npm run build
npm run analyze
```

## 🔒 Security Testing

### Input Validation:
```bash
# Test SQL injection attempts
curl -X POST "http://localhost:8000/chat/" \
     -H "Content-Type: application/json" \
     -d '{"message": "'; DROP TABLE users; --"}'

# Test XSS attempts
curl -X POST "http://localhost:8000/chat/" \
     -H "Content-Type: application/json" \
     -d '{"message": "<script>alert(\"xss\")</script>"}'
```

### API Security:
```bash
# Test CORS
curl -H "Origin: http://malicious-site.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS http://localhost:8000/chat/
```

## 📝 Test Data Management

### Create Test Data:
```bash
# Add test FAQs
curl -X POST "http://localhost:8000/chat/faqs" \
     -H "Content-Type: application/json" \
     -d '{"question": "Test question 1?", "answer": "Test answer 1"}'

curl -X POST "http://localhost:8000/chat/faqs" \
     -H "Content-Type: application/json" \
     -d '{"question": "Test question 2?", "answer": "Test answer 2"}'
```

### Clean Test Data:
```bash
# Clear fallback logs
echo "" > backend/data/fallback_logs.txt

# Reset FAQ data (backup first!)
cp backend/data/custom_faq.json backend/data/custom_faq.json.backup
```

## 🚀 Continuous Integration

### GitHub Actions Example:
```yaml
name: Test ChatBot
on: [push, pull_request]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.9
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements-test.txt
      - name: Run tests
        run: |
          cd backend
          pytest

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 18
      - name: Install dependencies
        run: |
          cd frontend
          npm install
      - name: Run tests
        run: |
          cd frontend
          npm test
```

## 📋 Testing Checklist

### Before Deployment:
- [ ] All automated tests pass
- [ ] Manual testing completed
- [ ] API endpoints tested
- [ ] Frontend components tested
- [ ] Error handling verified
- [ ] Performance acceptable
- [ ] Security tests passed
- [ ] RTL layout tested
- [ ] Mobile responsiveness verified
- [ ] Browser compatibility checked

### Regular Testing:
- [ ] Run automated tests daily
- [ ] Test new features manually
- [ ] Verify API changes
- [ ] Check fallback logs
- [ ] Monitor performance
- [ ] Update test data

## 🆘 Troubleshooting

### Common Test Issues:

1. **Backend tests failing:**
   - Check if backend server is running
   - Verify OpenAI API key is set
   - Check Python dependencies

2. **Frontend tests failing:**
   - Clear node_modules and reinstall
   - Check Jest configuration
   - Verify TypeScript types

3. **API tests failing:**
   - Ensure backend is on port 8000
   - Check CORS configuration
   - Verify request format

4. **Performance issues:**
   - Monitor API response times
   - Check database queries
   - Analyze bundle size

## 📚 Additional Resources

- [FastAPI Testing Guide](https://fastapi.tiangolo.com/tutorial/testing/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Postman Testing](https://learning.postman.com/docs/writing-scripts/test-scripts/)

---

**Happy Testing! 🎉** 
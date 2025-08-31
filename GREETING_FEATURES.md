# ChatBot Greeting System & Enhanced FAQ Features

## Overview
This update adds intelligent greeting detection and enhanced FAQ matching to make the chatbot more user-friendly and responsive.

## New Features

### 1. Automatic Greeting System
- **Smart Greeting Detection**: Automatically detects when users start conversations
- **Multi-language Support**: Recognizes greetings in both English and Persian
- **Auto-start Conversation**: Bot automatically greets users when chat opens
- **Randomized Responses**: Provides varied greeting messages for natural conversation

#### Supported Greetings:
- **English**: hello, hi, hey, good morning/afternoon/evening, start, begin
- **Persian**: سلام، درود، خوش آمدید، سلام علیکم، صبخ بخیر، عصر بخیر، شروع، آغاز، چت

### 2. Enhanced FAQ Matching
- **Multiple Search Strategies**: 
  1. Exact match (case-insensitive)
  2. Partial match (user question contains FAQ question)
  3. Reverse partial match (FAQ question contains user question)
  4. Word overlap matching (for longer questions)
- **Improved Accuracy**: Better finds relevant answers even with imperfect matches
- **Flexible Matching**: Handles variations in how users phrase questions

### 3. New API Endpoints
- **`/chat/stats`**: Get chatbot statistics including FAQ counts and categories
- **Enhanced `/chat/`**: Now supports greeting detection and improved FAQ lookup

## How It Works

### Greeting Flow:
1. User opens chat widget
2. Bot shows initial welcome message
3. After 1 second delay, bot automatically sends greeting
4. User can respond with any greeting or question
5. Bot detects greeting and responds appropriately

### FAQ Lookup Flow:
1. Check if message is a greeting → Return greeting response
2. Search FAQ database using multiple strategies
3. If FAQ found → Return answer
4. If not found → Send to GPT-4
5. Check GPT response quality → Use fallback if needed

## Technical Implementation

### Backend Changes:
- **FAQ Service**: Enhanced with greeting detection and improved search algorithms
- **Chat Router**: Updated to handle greeting detection before FAQ lookup
- **Database**: Enhanced partial matching with multiple strategies

### Frontend Changes:
- **Auto-conversation**: Automatically starts conversation when chat opens
- **Natural Timing**: 1-second delay for realistic conversation flow

## Testing

Run the test script to verify functionality:
```bash
cd backend
python test_greeting.py
```

This will test:
- Greeting detection for various languages
- FAQ lookup functionality
- Stats endpoint
- Overall system response

## Configuration

### Adding Custom Greetings:
Edit `backend/data/custom_faq.json` to add more greeting patterns:
```json
{
  "question": "your_greeting",
  "answer": "your_response"
}
```

### Modifying Greeting Detection:
Update the `is_greeting()` method in `FAQService` class to add/remove greeting patterns.

## Benefits

1. **Better User Experience**: Users feel welcomed immediately
2. **Improved FAQ Matching**: More accurate answers to user questions
3. **Natural Conversation Flow**: Bot feels more human-like
4. **Multi-language Support**: Better accessibility for Persian and English users
5. **Reduced Fallback Usage**: More questions get answered from FAQ database

## Future Enhancements

- **Context Awareness**: Remember user preferences and conversation history
- **Smart Suggestions**: Suggest related questions based on user input
- **Learning System**: Improve FAQ matching based on user interactions
- **Emotion Detection**: Respond appropriately to user mood and tone

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useChatStore, Message } from '@/store/chatStore'

// Icons (using simple SVG icons)
const SendIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
  </div>
)

// Static EVE-inspired Robot Component
const EveRobot: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000) // Hide after 5 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
      <div className="relative">
        {/* EVE's main body - sleek white oval */}
        <div className="w-16 h-20 bg-gradient-to-b from-white via-gray-50 to-gray-100 rounded-full shadow-lg border-2 border-gray-200 relative overflow-hidden">
          {/* Blue accent line at the top */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full"></div>
          
          {/* Blue glowing eyes - EVE's signature feature */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full shadow-md" style={{ 
              boxShadow: '0 0 8px #3b82f6, 0 0 16px #3b82f6'
            }}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full shadow-md" style={{ 
              boxShadow: '0 0 8px #3b82f6, 0 0 16px #3b82f6'
            }}></div>
          </div>
          
          {/* EVE's "face" - subtle expression line */}
          <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-300 rounded-full opacity-50"></div>
          
          {/* Blue accent details */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-blue-500 rounded-full"></div>
          
          {/* Additional blue accent line */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-400 rounded-full opacity-60"></div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 w-16 h-20 bg-blue-100 rounded-full opacity-20"></div>
        
        {/* EVE's "arms" - subtle side details */}
        <div className="absolute top-8 -left-1.5 w-0.5 h-5 bg-gray-300 rounded-full opacity-50"></div>
        <div className="absolute top-8 -right-1.5 w-0.5 h-5 bg-gray-300 rounded-full opacity-50"></div>
      </div>
    </div>
  )
}



interface ChatMessageProps {
  message: Message
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user'
  const isFallback = message.isFallback

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
          isUser
            ? 'bg-chat-user text-white rounded-br-none'
            : isFallback
            ? 'bg-chat-fallback text-yellow-800 rounded-bl-none'
            : 'bg-chat-bot text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm leading-relaxed font-vazir">{message.text}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString('fa-IR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}

const ChatWidget: React.FC = () => {
  const { messages, isLoading, isOpen, addMessage, setLoading, toggleChat } = useChatStore()
  const [inputValue, setInputValue] = useState('')
  const [showWavingBot, setShowWavingBot] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Add welcome message when component mounts for the first time
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        text: 'سلام 👋 من بات هوشمند زیمر هستم. چطور می‌تونم کمکتون کنم؟',
        sender: 'bot',
      })
    }
  }, []) // Empty dependency array ensures this runs only once

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      // Show waving bot when chat opens
      setShowWavingBot(true)
    } else {
      setShowWavingBot(false)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue('')

    // Add user message
    addMessage({
      text: userMessage,
      sender: 'user',
    })

    // Set loading state
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      
      // Add bot response
      addMessage({
        text: data.response,
        sender: 'bot',
        isFallback: data.source === 'fallback',
      })
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Add error message
      addMessage({
        text: 'متأسفانه مشکلی در ارتباط با سرور پیش آمد. لطفاً دوباره تلاش کنید.',
        sender: 'bot',
        isFallback: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="باز کردن چت"
        >
          <ChatIcon />
        </button>
      </div>
    )
  }

    return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col relative">
      {/* Static EVE Robot on top */}
      <EveRobot />
      
      {/* Header */}
      <div className="bg-primary-600 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
        <h3 className="font-vazir font-semibold text-lg">چت بات</h3>
        <button
          onClick={toggleChat}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="بستن چت"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 chat-scrollbar bg-gray-50">
        <div className="space-y-2">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-chat-bot text-gray-800 rounded-lg rounded-bl-none px-4 py-2 shadow-sm flex items-center">
                <LoadingSpinner />
                <span className="ml-2">در حال پردازش...</span>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2 space-x-reverse">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-vazir text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
            aria-label="ارسال پیام"
          >
            {isLoading ? <LoadingSpinner /> : <SendIcon />}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatWidget 
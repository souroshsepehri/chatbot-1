'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useChatStore, Message } from '@/store/chatStore'

// Theme configuration - Only Ocean theme (اقیانوس)
const themes = {
  ocean: {
    name: 'اقیانوس',
    primary: 'bg-gradient-ocean',
    secondary: 'bg-education-blue-700',
    accent: 'text-education-blue-700',
    background: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    header: 'bg-gradient-ocean',
    userMessage: 'bg-education-blue-700 text-white',
    botMessage: 'bg-white border border-blue-200',
    input: 'bg-white border-blue-300 focus:border-education-blue-600',
  },
}

// Icons
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



const BookIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
  </div>
)

// Sophisticated AI Assistant Component
const AIAssistant: React.FC<{ theme: any }> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
      <div className="relative">
        {/* Main AI body with glass morphism */}
        <div className={`w-20 h-24 rounded-2xl shadow-elegant backdrop-blur-sm border border-white/20 relative overflow-hidden ${theme.primary}`}>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
          
          {/* AI "brain" pattern */}
          <div className="absolute inset-2 bg-white/10 rounded-xl"></div>
          
          {/* Sophisticated "eyes" */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <div className="w-4 h-4 bg-white rounded-full shadow-lg animate-pulse-slow"></div>
            <div className="w-4 h-4 bg-white rounded-full shadow-lg animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          {/* Knowledge indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/60 rounded-full"></div>
          
          {/* Floating particles */}
          <div className="absolute top-2 left-2 w-1 h-1 bg-white/40 rounded-full animate-float"></div>
          <div className="absolute top-3 right-3 w-1 h-1 bg-white/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Subtle glow effect */}
        <div className={`absolute inset-0 w-20 h-24 rounded-2xl opacity-30 ${theme.primary}`}></div>
      </div>
    </div>
  )
}

interface ChatMessageProps {
  message: Message
  theme: any
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, theme }) => {
  const isUser = message.sender === 'user'
  const isFallback = message.isFallback

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-soft ${
          isUser
            ? `${theme.userMessage} rounded-br-md`
            : isFallback
            ? 'bg-education-amber-100 text-education-amber-800 rounded-bl-md border border-education-amber-200'
            : `${theme.botMessage} rounded-bl-md`
        }`}
      >
        <div className="flex items-start space-x-2 space-x-reverse">
          {!isUser && (
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${theme.secondary} text-white text-xs font-bold`}>
              <BookIcon />
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm leading-relaxed font-vazir">{message.text}</p>
            <p className={`text-xs mt-2 ${isUser ? 'text-white/70' : 'text-gray-500'}`}>
              {message.timestamp.toLocaleTimeString('fa-IR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ChatWidget: React.FC = () => {
  const { messages, isLoading, isOpen, addMessage, setLoading, toggleChat } = useChatStore()
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const theme = themes.ocean

  // Add welcome message when component mounts for the first time
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        text: 'سلام 👋 من دستیار هوشمند شما هستم. چطور می‌تونم کمکتون کنم؟',
        sender: 'bot',
      })
    }
  }, [])

  // Auto-start conversation when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 1) {
      const startConversation = async () => {
        try {
          const response = await fetch('http://localhost:8000/chat/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: 'سلام' }),
          })

          if (response.ok) {
            const data = await response.json()
            addMessage({
              text: data.response,
              sender: 'bot',
              isFallback: data.source === 'fallback',
            })
          }
        } catch (error) {
          console.error('Error starting conversation:', error)
        }
      }
      
      setTimeout(startConversation, 1000)
    }
  }, [isOpen, messages.length])

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
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue('')

    addMessage({
      text: userMessage,
      sender: 'user',
    })

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
      
      addMessage({
        text: data.response,
        sender: 'bot',
        isFallback: data.source === 'fallback',
      })
    } catch (error) {
      console.error('Error sending message:', error)
      
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
          className={`${theme.primary} hover:scale-110 text-white rounded-full p-4 shadow-elegant transition-all duration-300`}
          aria-label="باز کردن چت"
        >
          <ChatIcon />
        </button>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 w-96 h-[500px] ${theme.background} rounded-2xl shadow-elegant border border-white/20 backdrop-blur-sm flex flex-col relative overflow-hidden`}>
      {/* AI Assistant */}
      <AIAssistant theme={theme} />
      
      {/* Header */}
      <div className={`${theme.header} text-white px-6 py-4 rounded-t-2xl flex items-center justify-between relative`}>
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <BookIcon />
          </div>
          <div>
            <h3 className="font-vazir font-semibold text-lg">دستیار هوشمند</h3>
            <p className="text-xs text-white/80">آماده کمک به شما</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={toggleChat}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="بستن چت"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 chat-scrollbar">
        <div className="space-y-2">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} theme={theme} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4 animate-fade-in">
              <div className={`${theme.botMessage} rounded-2xl rounded-bl-md px-4 py-3 shadow-soft flex items-center`}>
                <LoadingSpinner />
                <span className="ml-3 text-sm font-vazir">در حال پردازش...</span>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-6 border-t border-white/20 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3 space-x-reverse">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="پیام خود را بنویسید..."
            className={`flex-1 px-4 py-3 ${theme.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-vazir text-sm shadow-soft transition-all duration-200`}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className={`${theme.secondary} hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-soft`}
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
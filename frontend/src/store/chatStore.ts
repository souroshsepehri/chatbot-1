import { create } from 'zustand'

export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  isFallback?: boolean
}

interface ChatState {
  messages: Message[]
  isLoading: boolean
  isOpen: boolean
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setLoading: (loading: boolean) => void
  toggleChat: () => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,
  isOpen: false,

  addMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    
    set((state) => ({
      messages: [...state.messages, newMessage],
    }))
  },

  setLoading: (loading) => {
    set({ isLoading: loading })
  },

  toggleChat: () => {
    set((state) => ({ isOpen: !state.isOpen }))
  },

  clearMessages: () => {
    set({ messages: [] })
  },
})) 
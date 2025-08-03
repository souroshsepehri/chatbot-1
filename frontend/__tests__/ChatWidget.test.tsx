import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ChatWidget from '../src/components/ChatWidget'
import { useChatStore } from '../src/store/chatStore'

describe('ChatWidget', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn()
    
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn()
    
    // Reset the actual Zustand store state
    useChatStore.setState({
      messages: [],
      isLoading: false,
      isOpen: false,
    })
  })

  test('renders chat toggle button', () => {
    render(<ChatWidget />)
    const toggleButton = screen.getByRole('button', { name: /باز کردن چت/i })
    expect(toggleButton).toBeInTheDocument()
  })

  test('opens chat when toggle button is clicked', () => {
    render(<ChatWidget />)
    const toggleButton = screen.getByRole('button', { name: /باز کردن چت/i })
    
    fireEvent.click(toggleButton)
    
    // Verify toggleChat was called
    expect(useChatStore.getState().isOpen).toBe(true)
  })

  test('sends message when form is submitted', async () => {
    // Mock successful API response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'Test response', source: 'faq' }),
    })

    // Set chat as open
    useChatStore.setState({ isOpen: true })

    render(<ChatWidget />)
    
    // Type message
    const input = screen.getByPlaceholderText(/پیام خود را بنویسید/i)
    fireEvent.change(input, { target: { value: 'Test message' } })
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /ارسال پیام/i })
    fireEvent.click(submitButton)
    
    // Check if API was called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Test message' }),
      })
    })
  })

  test('handles API errors gracefully', async () => {
    // Mock API error
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    // Set chat as open
    useChatStore.setState({ isOpen: true })

    render(<ChatWidget />)
    
    // Type and send message
    const input = screen.getByPlaceholderText(/پیام خود را بنویسید/i)
    fireEvent.change(input, { target: { value: 'Test message' } })
    
    const submitButton = screen.getByRole('button', { name: /ارسال پیام/i })
    fireEvent.click(submitButton)
    
    // Should handle error without crashing
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  test('displays loading state during API call', async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve({ ok: true, json: async () => ({ response: 'Test', source: 'faq' }) }), 100))
    )
    useChatStore.setState({ isOpen: true })

    render(<ChatWidget />)
    
    // Type and send message
    const input = screen.getByPlaceholderText(/پیام خود را بنویسید/i)
    fireEvent.change(input, { target: { value: 'Test message' } })
    const submitButton = screen.getByRole('button', { name: /ارسال پیام/i })
    fireEvent.click(submitButton)
    
    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('در حال پردازش'))).toBeInTheDocument()
    })
  })
}) 
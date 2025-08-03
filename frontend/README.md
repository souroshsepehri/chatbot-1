# ChatBot Frontend

A Next.js 14 frontend application with a floating chatbot widget that supports Persian language and RTL layout.

## Features

- **Floating Chat Widget**: Fixed position in bottom-left corner
- **RTL Support**: Full right-to-left layout support
- **Persian Language**: Native Persian font (Vazir) and text direction
- **Real-time Chat**: Live communication with backend API
- **Message Types**: User messages, bot responses, and fallback messages
- **Auto-scroll**: Automatically scrolls to latest messages
- **Loading States**: Visual feedback during API calls
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles with Tailwind
│   │   ├── layout.tsx           # Root layout with RTL support
│   │   └── page.tsx             # Main page with ChatWidget
│   ├── components/
│   │   └── ChatWidget.tsx       # Main chat widget component
│   └── store/
│       └── chatStore.ts         # Zustand state management
├── public/                      # Static assets
├── package.json                 # Dependencies
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── next.config.js              # Next.js configuration
```

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open Browser**:
   Navigate to `http://localhost:3000`

## Dependencies

### Core Dependencies
- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management

### Development Dependencies
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## API Integration

The ChatWidget communicates with the backend API at `http://localhost:8000/chat/`:

### Request Format
```json
{
  "message": "User message here"
}
```

### Response Format
```json
{
  "response": "Bot response here",
  "source": "faq|gpt|fallback"
}
```

## Component Features

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

## Styling

### Tailwind Configuration
- **Custom Colors**: Primary blue theme and chat-specific colors
- **Custom Fonts**: Vazir font family for Persian text
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first responsive design

### CSS Features
- **Custom Scrollbar**: Styled scrollbar for chat area
- **RTL Support**: Direction-aware styles
- **Animations**: Slide and fade animations
- **Focus States**: Accessible focus indicators

## State Management

### Zustand Store
- **Messages**: Array of chat messages
- **Loading State**: API call status
- **Chat Visibility**: Open/closed state
- **Actions**: Add messages, toggle chat, clear history

### Message Structure
```typescript
interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  isFallback?: boolean
}
```

## Usage

1. **Open Chat**: Click the chat icon in bottom-left corner
2. **Type Message**: Enter your question in the input field
3. **Send Message**: Press Enter or click send button
4. **View Response**: Bot response appears with appropriate styling
5. **Close Chat**: Click the X button to minimize

## Development

### Adding Features
1. **New Components**: Add to `src/components/`
2. **State Updates**: Modify `src/store/chatStore.ts`
3. **Styling**: Update `tailwind.config.ts` or `globals.css`
4. **API Changes**: Update API calls in `ChatWidget.tsx`

### Testing
```bash
# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile
- **RTL Support**: All modern browsers with RTL support

## Performance

- **Code Splitting**: Automatic Next.js code splitting
- **Image Optimization**: Built-in Next.js image optimization
- **Bundle Analysis**: Use `npm run build` to analyze bundle size
- **Lazy Loading**: Components load on demand

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site deployment
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

## Environment Variables

Create `.env.local` for local development:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Troubleshooting

### Common Issues
1. **API Connection**: Ensure backend is running on port 8000
2. **Font Loading**: Check internet connection for Vazir font
3. **RTL Display**: Verify browser RTL support
4. **TypeScript Errors**: Run `npm run build` to check types

### Performance Issues
1. **Bundle Size**: Analyze with `npm run build`
2. **Font Loading**: Consider font preloading
3. **API Calls**: Implement request caching if needed

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with proper TypeScript types
4. Test thoroughly
5. Submit pull request

## License

MIT License 
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChatBot - چت بات',
  description: 'A Persian chatbot with FAQ and GPT-4 integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-vazir">
        {children}
      </body>
    </html>
  )
} 
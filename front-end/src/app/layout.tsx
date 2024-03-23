import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import './globals.scss'

export const metadata: Metadata = {
  title: 'FistarolFlix',
  description: 'FistarolFlix - The best movies and series in one place',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}

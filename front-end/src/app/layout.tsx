import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

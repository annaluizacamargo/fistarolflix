'use client'

import { UserProvider } from '@/providers/Profile'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import './globals.scss'
import Auth from '@/middleware/auth'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>FistarolFlix</title>
        <meta name="description" content="FistarolFlix - The best movies and series in one place" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <UserProvider>
          <Header />
          <Auth>{children}</Auth>
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}

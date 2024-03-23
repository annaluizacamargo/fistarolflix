'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

interface AuthProps {
  children: React.ReactNode
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const url = usePathname() || ''
  const unloggedPages = ['/login', '/register']
  const isUnlogged = typeof window !== 'undefined' && unloggedPages.includes(url)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  if (!token && !isUnlogged) {
    window.location.href = '/login'
    return null
  }

  return <>{children}</>
}

export default Auth

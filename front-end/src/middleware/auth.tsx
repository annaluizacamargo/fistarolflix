'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

interface AuthProps {
  children: React.ReactNode
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const url = usePathname() || ''
  const unloggedPages = ['/login', '/register']
  let isUnlogged = true
  let token = null

  if (typeof window !== 'undefined') {
    isUnlogged = unloggedPages.includes(url) ? true : false
    token = localStorage.getItem('token') ?? null
  }

  if (!token && !isUnlogged) {
    window.location.href = '/login'
    return null
  }

  return <>{children}</>
}

export default Auth

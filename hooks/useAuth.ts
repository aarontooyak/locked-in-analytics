'use client'

import { useState, useEffect } from 'react'

// This is a placeholder. We'll implement the real authentication later.
export const useAuth = () => {
  const [user, setUser] = useState<{ email: string } | null>(null)

  useEffect(() => {
    // Simulating an authentication check
    setTimeout(() => {
      setUser({ email: 'user@example.com' })
    }, 1000)
  }, [])

  const signOut = () => {
    setUser(null)
  }

  return { user, signOut }
}
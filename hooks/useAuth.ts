'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
// We'll implement this later
// import { supabase } from '@/lib/supabase'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)

  // Placeholder for signOut function
  const signOut = () => {
    // We'll implement this later
    console.log('Sign out')
  }

  return { user, signOut }
}
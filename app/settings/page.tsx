'use client'

import { useAuth } from '../../hooks/useAuth'

export default function SettingsPage() {
  const { user, signOut } = useAuth()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      {user ? (
        <div>
          <p>Logged in as: {user.email}</p>
          <button onClick={signOut} className="mt-4 bg-blue-500 text-white p-2 rounded">Sign Out</button>
        </div>
      ) : (
        <p>Please log in to view settings.</p>
      )}
    </div>
  )
}
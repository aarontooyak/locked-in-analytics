'use client'

import React from 'react'

interface DashboardProps {
  fileId: string
}

const Dashboard: React.FC<DashboardProps> = ({ fileId }) => {
  // This is a placeholder. We'll implement the full dashboard later.
  return (
    <div>
      <h2>Dashboard for file: {fileId}</h2>
      {/* We'll add charts and insights here later */}
    </div>
  )
}

export default Dashboard
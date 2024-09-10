'use client'

import React, { useEffect, useState } from 'react'
import ChartComponent from './ChartComponent'
import { analyzeData } from '@/lib/dataPipeline'

interface DashboardProps {
  fileId: string
}

const Dashboard: React.FC<DashboardProps> = ({ fileId }) => {
  const [data, setData] = useState<any[] | null>(null)
  const [insights, setInsights] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await analyzeData(fileId)
        if (result.success) {
          setData(result.data)
          setInsights(result.insights)
          setError(null)
        } else {
          throw new Error(result.message || 'Failed to analyze data')
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load dashboard data. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [fileId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!data) {
    return <div>No data available</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard for file: {fileId}</h2>
      <div className="mb-8">
        <ChartComponent data={data} xKey="date" yKey="value" />
      </div>
      {insights && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">AI Insights:</h3>
          <p className="whitespace-pre-wrap">{insights}</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
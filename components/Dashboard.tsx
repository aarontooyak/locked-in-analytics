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

  useEffect(() => {
    const fetchData = async () => {
      const result = await analyzeData(fileId)
      setData(result.data)
      setInsights(result.insights)
    }
    fetchData()
  }, [fileId])

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Dashboard for file: {fileId}</h2>
      <ChartComponent data={data} xKey="date" yKey="value" />
      {insights && <div className="mt-4"><h3>Insights:</h3><p>{insights}</p></div>}
    </div>
  )
}

export default Dashboard
export const uploadFile = async (file: File, onProgress: (progress: number) => void): Promise<string> => {
  // Simulate file upload
  return new Promise((resolve) => {
    setTimeout(() => {
      onProgress(100)
      resolve('mock-file-id')
    }, 2000)
  })
}

export const analyzeData = async (fileId: string) => {
  // Simulate data analysis
  return {
    insights: 'Mock insights for file ' + fileId,
    data: [
      { date: '2023-01', value: 100 },
      { date: '2023-02', value: 120 },
      { date: '2023-03', value: 110 },
      { date: '2023-04', value: 130 },
    ]
  }
}
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
  const mockData = [
    { date: '2023-01', value: 100 },
    { date: '2023-02', value: 120 },
    { date: '2023-03', value: 110 },
    { date: '2023-04', value: 130 },
  ];

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: mockData, fileId }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze data');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error analyzing data:', error);
    throw error;
  }
}

// This function is kept for potential server-side use
export async function analyzeDataWithClaude(data: any) {
  const prompt = `Analyze the following dataset and provide insights:

${JSON.stringify(data, null, 2)}

Please provide:
1. A summary of the main trends
2. Any notable outliers or anomalies
3. Potential correlations between variables
4. Suggestions for further analysis or visualizations`;

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze data with Claude');
    }

    const { insights } = await response.json();
    return insights;
  } catch (error) {
    console.error('Error analyzing data with Claude:', error);
    throw error;
  }
}
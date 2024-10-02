import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

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
  // For now, we'll use mock data. In a real scenario, you'd fetch the actual data associated with the fileId
  const mockData = [
    { date: '2023-01', value: 100 },
    { date: '2023-02', value: 120 },
    { date: '2023-03', value: 110 },
    { date: '2023-04', value: 130 },
  ];

  return analyzeDataWithClaude(mockData);
}

export async function analyzeDataWithClaude(data: any) {
  const prompt = `Analyze the following dataset and provide insights:

${JSON.stringify(data, null, 2)}

Please provide:
1. A summary of the main trends
2. Any notable outliers or anomalies
3. Potential correlations between variables
4. Suggestions for further analysis or visualizations`;

  try {
    const response = await anthropic.completions.create({
      model: "claude-3-sonnet-20240229",
      max_tokens_to_sample: 1000,
      prompt: prompt,
    });

    return response.completion;
  } catch (error) {
    console.error('Error analyzing data with Claude:', error);
    throw error;
  }
}
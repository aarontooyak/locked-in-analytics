import { NextResponse } from 'next/server';
import { analyzeDataWithClaude } from '@/lib/dataPipeline';

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    if (!data) {
      return NextResponse.json({ success: false, message: 'No data provided' }, { status: 400 });
    }

    // Analyze the data using Claude
    const insights = await analyzeDataWithClaude(data);

    return NextResponse.json({
      success: true,
      message: 'Data analyzed successfully',
      insights: insights,
      data: data
    });
  } catch (error) {
    console.error('Analysis failed:', error);
    return NextResponse.json({ success: false, message: 'Analysis failed' }, { status: 500 });
  }
}
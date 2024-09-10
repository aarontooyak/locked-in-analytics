import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'
import { analyzeDataWithClaude } from '@/lib/dataPipeline';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
  }

  try {
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('your-bucket-name')
      .upload(`files/${file.name}`, file);

    if (error) throw error;

    // For demonstration, we'll use mock data.
    // In a real scenario, you'd process the uploaded file here.
    const mockData = [
      { date: '2023-01', value: 100 },
      { date: '2023-02', value: 120 },
      { date: '2023-03', value: 110 },
      { date: '2023-04', value: 130 },
    ];

    // Analyze the data using Claude
    const insights = await analyzeDataWithClaude(mockData);

    return NextResponse.json({
      success: true,
      message: 'File uploaded and analyzed successfully',
      fileName: file.name,
      filePath: data.path,
      insights: insights,
      data: mockData  // In a real scenario, this would be the processed file data
    });
  } catch (error) {
    console.error('Operation failed:', error);
    return NextResponse.json({ success: false, message: 'Operation failed' }, { status: 500 });
  }
}
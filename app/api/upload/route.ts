import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'
import { analyzeDataWithClaude } from '@/lib/dataPipeline';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    console.log('Received upload request');
    
    const formData = await request.formData();
    console.log('FormData received');

    const file = formData.get('file') as File;
    if (!file) {
      console.log('No file uploaded');
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    console.log('File received:', file.name, file.type, file.size);

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);
    console.log('File converted to buffer, length:', fileBuffer.length);

    // Upload file to Supabase Storage
    console.log('Attempting to upload to Supabase');
    const { data, error } = await supabase.storage
      .from('locked-in-files')
      .upload(`files/${file.name}`, fileBuffer, {
        contentType: file.type
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'File upload failed', 
        error: error.message
      }, { status: 500 });
    }

    console.log('File uploaded to Supabase:', data);

    // For demonstration, we'll use mock data.
    // In a real scenario, you'd process the uploaded file here.
    const mockData = [
      { date: '2023-01', value: 100 },
      { date: '2023-02', value: 120 },
      { date: '2023-03', value: 110 },
      { date: '2023-04', value: 130 },
    ];

    console.log('Analyzing data with Claude');
    let insights;
    try {
      // Analyze the data using Claude
      insights = await analyzeDataWithClaude(mockData);
      console.log('Analysis complete');
    } catch (analysisError) {
      console.error('Error during Claude analysis:', analysisError);
      return NextResponse.json({
        success: false,
        message: 'Data analysis failed',
        error: analysisError instanceof Error ? analysisError.message : String(analysisError)
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'File uploaded and analyzed successfully',
      fileName: file.name,
      filePath: data?.path,
      insights: insights,
      data: mockData  // In a real scenario, this would be the processed file data
    });

  } catch (error) {
    console.error('Operation failed:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Operation failed', 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
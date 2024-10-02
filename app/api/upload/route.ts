import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'
import { analyzeData } from '@/lib/dataPipeline';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    console.log('Received upload request');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.log('No file uploaded');
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    console.log('File received:', file.name, file.type, file.size);

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    console.log('File converted to buffer');

    // Upload file to Supabase Storage
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

    console.log('Analyzing data with Claude');
    const insights = await analyzeData(data?.path || 'mock-file-id');
    console.log('Analysis complete');

    return NextResponse.json({
      success: true,
      message: 'File uploaded and analyzed successfully',
      fileName: file.name,
      filePath: data?.path,
      insights: insights,
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
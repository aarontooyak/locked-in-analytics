'use client'

import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { uploadFile } from '@/lib/dataPipeline'
import Button from './ui/Button'

const DataUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const router = useRouter()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    try {
      const file = acceptedFiles[0]
      const fileId = await uploadFile(file, (progress) => setUploadProgress(progress))
      router.push(`/dashboard?fileId=${fileId}`)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }, [router])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-lg text-center ${
          isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div>
            <p>Uploading... {uploadProgress.toFixed(0)}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div>
            <p>Drag 'n' drop a file here, or click to select a file</p>
            <Button className="mt-4">Select File</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DataUpload
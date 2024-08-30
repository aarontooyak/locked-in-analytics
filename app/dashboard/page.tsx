import DataUpload from '@/components/DataUpload'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Locked In Analytics</h1>
      <DataUpload />
    </main>
  )
}
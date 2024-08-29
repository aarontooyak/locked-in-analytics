import Dashboard from '../../components/Dashboard'

export default function DashboardPage({ searchParams }: { searchParams: { fileId: string } }) {
  const { fileId } = searchParams

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {fileId ? <Dashboard fileId={fileId} /> : <p>No file ID provided</p>}
    </div>
  )
}
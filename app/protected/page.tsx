export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="neo-depth bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8">
          <h1 className="text-3xl font-light text-zinc-100 mb-4">MMS Dashboard</h1>
          <p className="text-zinc-400 mb-6">
            Welcome to the MMS management system. All features are now publicly accessible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="neo-depth-subtle bg-zinc-800/30 p-6 rounded-xl border border-zinc-700">
              <h3 className="text-lg font-light text-zinc-200 mb-2">System Status</h3>
              <p className="text-zinc-400 text-sm">All systems operational</p>
            </div>

            <div className="neo-depth-subtle bg-zinc-800/30 p-6 rounded-xl border border-zinc-700">
              <h3 className="text-lg font-light text-zinc-200 mb-2">Database</h3>
              <p className="text-zinc-400 text-sm">PostgreSQL connected</p>
            </div>

            <div className="neo-depth-subtle bg-zinc-800/30 p-6 rounded-xl border border-zinc-700">
              <h3 className="text-lg font-light text-zinc-200 mb-2">Access Level</h3>
              <p className="text-zinc-400 text-sm">Public access enabled</p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <a
              href="/"
              className="neo-depth bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-6 py-3 rounded-xl border border-zinc-600 transition-colors"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

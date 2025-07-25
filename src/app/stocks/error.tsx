'use client'

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Stocks Error</h2>
        <button onClick={reset} className="px-4 py-2 bg-green-600 text-white rounded">
          Try again
        </button>
      </div>
    </div>
  )
}
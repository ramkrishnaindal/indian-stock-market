'use client'

export default function Home() {
  return (
    <div className="p-8">
      <div className="bg-blue-600 text-white p-12 rounded-lg text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Indian Stock Market Platform</h1>
        <p className="text-xl mb-6">Professional trading platform with advanced analytics</p>
        <div className="space-x-4">
          <a href="/auth" className="bg-yellow-500 text-black px-6 py-3 rounded font-bold">Get Started</a>
          <a href="/dashboard" className="bg-white/20 px-6 py-3 rounded font-bold">Dashboard</a>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-6">Platform Features</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <a href="/dashboard" className="bg-blue-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Dashboard</h3>
          <p>Portfolio overview and analytics</p>
        </a>
        <a href="/stocks" className="bg-purple-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Stocks</h3>
          <p>Browse and analyze stocks</p>
        </a>
        <a href="/portfolio" className="bg-green-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Portfolio</h3>
          <p>Manage investments</p>
        </a>
      </div>
    </div>
  )
}
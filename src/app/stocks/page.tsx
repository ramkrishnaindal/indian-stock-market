export default function StocksPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Stocks</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded">
              <h3 className="font-medium">NIFTY 50</h3>
              <p className="text-2xl font-bold text-green-600">19,850.25</p>
              <p className="text-sm text-green-600">+125.50 (+0.63%)</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-medium">SENSEX</h3>
              <p className="text-2xl font-bold text-red-600">66,750.10</p>
              <p className="text-sm text-red-600">-85.25 (-0.13%)</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-medium">BANK NIFTY</h3>
              <p className="text-2xl font-bold text-green-600">45,250.75</p>
              <p className="text-sm text-green-600">+225.30 (+0.50%)</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-medium">NIFTY IT</h3>
              <p className="text-2xl font-bold text-blue-600">28,950.40</p>
              <p className="text-sm text-blue-600">+15.20 (+0.05%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
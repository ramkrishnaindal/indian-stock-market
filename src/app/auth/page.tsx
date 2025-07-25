'use client'

export default function AuthPage() {
  const handleGoogleLogin = () => {
    alert('Google login clicked - redirecting to dashboard')
    window.location.href = '/dashboard'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Form submitted - redirecting to dashboard')
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Welcome Back!</h1>
        
        <button 
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg mb-4 flex items-center justify-center gap-2 transition-colors"
        >
          <span className="text-xl">G</span>
          <span>Continue with Google</span>
        </button>
        
        <div className="text-center mb-4 text-gray-500 dark:text-gray-400">Or continue with email</div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors">
            Sign In
          </button>
        </form>
        
        <div className="text-center mt-4">
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Don't have an account? Sign up</a>
        </div>
      </div>
    </div>
  )
}
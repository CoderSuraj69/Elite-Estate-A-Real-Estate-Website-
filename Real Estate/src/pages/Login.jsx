import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    navigate('/')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      {/* Background with real estate imagery */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop')`
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="card p-8 bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm">
          <h1 className="text-3xl font-display font-bold text-center text-stone-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-center mb-8">
            Sign in to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-500">
            Demo: Use any email and password to login
          </p>

          <p className="mt-4 text-center text-stone-600 dark:text-stone-400">
            Don't have an account?{' '}
            <span className="text-primary-600 dark:text-primary-400 font-medium">
              This is a demo — just enter any credentials to sign in
            </span>
          </p>
        </div>

        <p className="mt-6 text-center">
          <Link to="/" className="text-white/90 hover:text-white font-medium transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  )
}

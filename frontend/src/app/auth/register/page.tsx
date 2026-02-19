'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/store/auth.store'

export default function RegisterPage() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authApi.register(form)
      setAuth(res.data.user, res.data.access_token)
      router.push('/app')
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string | string[] } } }
      const msg = e.response?.data?.message
      setError(Array.isArray(msg) ? msg.join(', ') : (msg || 'Registration failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-2xl text-white">NEXCORD</span>
          </div>
        </div>
        <div className="bg-[#16162a] border border-[#2a2a4a] rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-2">Create account</h1>
          <p className="text-[#9898b8] text-sm mb-8">Join NEXCORD — where communities evolve</p>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#9898b8] text-xs font-medium mb-1.5 uppercase tracking-wide">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0f0f1a] border border-[#2a2a4a] text-white placeholder-[#9898b8] focus:outline-none focus:border-[#6366f1] transition-colors text-sm"
                placeholder="cooluser"
                minLength={3}
                maxLength={32}
                required
              />
            </div>
            <div>
              <label className="block text-[#9898b8] text-xs font-medium mb-1.5 uppercase tracking-wide">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0f0f1a] border border-[#2a2a4a] text-white placeholder-[#9898b8] focus:outline-none focus:border-[#6366f1] transition-colors text-sm"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-[#9898b8] text-xs font-medium mb-1.5 uppercase tracking-wide">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0f0f1a] border border-[#2a2a4a] text-white placeholder-[#9898b8] focus:outline-none focus:border-[#6366f1] transition-colors text-sm"
                placeholder="••••••••"
                minLength={8}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-[#9898b8] text-sm mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#6366f1] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

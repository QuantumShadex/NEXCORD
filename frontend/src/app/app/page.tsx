'use client'
import { useAuthStore } from '@/store/auth.store'

export default function AppHomePage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="flex-1 flex items-center justify-center bg-[#0f0f1a]">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}>
          <span className="text-white font-bold text-3xl">N</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">
          Welcome back,{' '}
          <span className="bg-gradient-to-r from-[#6366f1] to-[#06b6d4] bg-clip-text text-transparent">
            {user?.username}
          </span>
        </h1>
        <p className="text-[#9898b8] text-base max-w-sm">
          Select a Space from the sidebar to start chatting, or create a new one.
        </p>
      </div>
    </div>
  )
}

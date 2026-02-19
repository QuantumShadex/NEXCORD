'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import SpaceSidebar from '@/components/SpaceSidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    if (!user) router.replace('/auth/login')
  }, [user, router])

  if (!user) return null

  return (
    <div className="flex h-screen bg-[#0f0f1a] overflow-hidden">
      <SpaceSidebar />
      {children}
    </div>
  )
}

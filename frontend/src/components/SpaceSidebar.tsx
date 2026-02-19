'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { spacesApi } from '@/lib/api'
import { useSpacesStore } from '@/store/spaces.store'
import { useAuthStore } from '@/store/auth.store'
import CreateSpaceModal from './CreateSpaceModal'

export default function SpaceSidebar() {
  const router = useRouter()
  const { spaces, setSpaces, activeSpace } = useSpacesStore()
  const { user, logout } = useAuthStore()
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    spacesApi.list().then((res) => setSpaces(res.data)).catch(() => {})
  }, [setSpaces])

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <>
      <div className="w-[72px] bg-[#0f0f1a] flex flex-col items-center py-3 gap-2 border-r border-[#2a2a4a] overflow-y-auto">
        {/* Home */}
        <Link
          href="/app"
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center text-white font-bold text-lg hover:rounded-xl transition-all mb-2 shrink-0 shadow-lg"
          style={{ boxShadow: '0 0 15px rgba(99,102,241,0.3)' }}
        >
          N
        </Link>
        <div className="w-8 h-px bg-[#2a2a4a]" />
        {/* Spaces */}
        {spaces.map((space) => (
          <Link
            key={space.id}
            href={`/app/spaces/${space.id}`}
            title={space.name}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all hover:rounded-xl shrink-0 ${
              activeSpace?.id === space.id
                ? 'bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white rounded-xl'
                : 'bg-[#16162a] text-[#9898b8] hover:text-white hover:bg-[#1e1e35]'
            }`}
            style={space.theme_color ? { backgroundColor: space.theme_color } : {}}
          >
            {space.name.slice(0, 2).toUpperCase()}
          </Link>
        ))}
        {/* Create Space */}
        <button
          onClick={() => setShowCreate(true)}
          className="w-12 h-12 rounded-2xl bg-[#16162a] text-[#06b6d4] flex items-center justify-center text-xl hover:bg-[#06b6d4] hover:text-white hover:rounded-xl transition-all shrink-0 border border-dashed border-[#2a2a4a] hover:border-[#06b6d4]"
          title="Create Space"
        >
          +
        </button>
        <div className="flex-1" />
        {/* User avatar */}
        <button
          onClick={handleLogout}
          title={`${user?.username} — Click to logout`}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center text-white font-bold text-sm shrink-0 hover:opacity-80 transition-opacity"
        >
          {user?.username?.slice(0, 1).toUpperCase()}
        </button>
      </div>
      {showCreate && <CreateSpaceModal onClose={() => setShowCreate(false)} />}
    </>
  )
}

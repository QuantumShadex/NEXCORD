'use client'

interface Member {
  id: string
  user: { id: string; username: string; avatar_url?: string }
  role?: { name: string; color: string }
}

interface Props {
  members: Member[]
}

export default function MemberList({ members }: Props) {
  return (
    <div className="w-56 bg-[#16162a] border-l border-[#2a2a4a] flex-col hidden lg:flex">
      <div className="px-4 py-3 border-b border-[#2a2a4a]">
        <h3 className="text-[#9898b8] text-xs font-semibold uppercase tracking-wider">Members — {members.length}</h3>
      </div>
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {members.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#1e1e35] transition-colors group cursor-pointer"
          >
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center text-white font-bold text-xs">
                {m.user?.username?.slice(0, 1).toUpperCase()}
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#16162a]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#9898b8] group-hover:text-white text-sm truncate transition-colors">{m.user?.username}</p>
              {m.role && (
                <p className="text-xs truncate" style={{ color: m.role.color || '#9898b8' }}>{m.role.name}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

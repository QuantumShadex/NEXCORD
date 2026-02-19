'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { spacesApi } from '@/lib/api'
import { useSpacesStore } from '@/store/spaces.store'
import StreamList from '@/components/StreamList'
import ChatArea from '@/components/ChatArea'
import MemberList from '@/components/MemberList'

export default function SpacePage() {
  const { spaceId } = useParams<{ spaceId: string }>()
  const { activeSpace, activeStream, setActiveSpace } = useSpacesStore()
  const [members, setMembers] = useState<{ id: string; user: { id: string; username: string; avatar_url?: string }; role?: { name: string; color: string } }[]>([])

  useEffect(() => {
    if (spaceId) {
      spacesApi.get(spaceId).then((res) => setActiveSpace(res.data)).catch(() => {})
      spacesApi.getMembers(spaceId).then((res) => setMembers(res.data)).catch(() => {})
    }
  }, [spaceId, setActiveSpace])

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Stream list */}
      <StreamList spaceId={spaceId} />
      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {activeStream ? (
          <ChatArea stream={activeStream} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#9898b8]">
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <p className="text-lg font-medium text-white mb-1">Pick a stream</p>
              <p className="text-sm">Select a stream from the left to start chatting.</p>
            </div>
          </div>
        )}
        {/* Member list */}
        <MemberList members={members} />
      </div>
    </div>
  )
}

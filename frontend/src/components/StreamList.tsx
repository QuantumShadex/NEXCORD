'use client'
import { useEffect, useState } from 'react'
import { streamsApi } from '@/lib/api'
import { useSpacesStore } from '@/store/spaces.store'

const STREAM_ICONS: Record<string, string> = {
  text: '#',
  voice: '🔊',
  stage: '📢',
  announcement: '📣',
  forum: '📋',
}

interface Stream {
  id: string
  name: string
  type: string
  topic?: string
  position: number
}

export default function StreamList({ spaceId }: { spaceId: string }) {
  const { activeSpace, activeStream, setActiveStream } = useSpacesStore()
  const [streams, setStreams] = useState<Stream[]>([])

  useEffect(() => {
    if (spaceId) {
      streamsApi.list(spaceId).then((res) => setStreams(res.data)).catch(() => {})
    }
  }, [spaceId])

  return (
    <div className="w-60 bg-[#16162a] flex flex-col border-r border-[#2a2a4a]">
      {/* Space header */}
      <div className="px-4 py-3 border-b border-[#2a2a4a]">
        <h2 className="text-white font-semibold text-sm truncate">{activeSpace?.name || 'Space'}</h2>
        {activeSpace?.description && (
          <p className="text-[#9898b8] text-xs mt-0.5 truncate">{activeSpace.description}</p>
        )}
      </div>

      {/* Streams */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        <p className="px-2 py-1 text-[#9898b8] text-xs font-semibold uppercase tracking-wider">Streams</p>
        {streams.length === 0 && (
          <p className="px-2 py-2 text-[#9898b8] text-xs">No streams yet</p>
        )}
        {streams.map((stream) => (
          <button
            key={stream.id}
            onClick={() => setActiveStream(stream)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors text-left ${
              activeStream?.id === stream.id
                ? 'bg-[#1e1e35] text-white'
                : 'text-[#9898b8] hover:text-white hover:bg-[#1e1e35]/60'
            }`}
          >
            <span className="text-[#9898b8] w-4 text-center">{STREAM_ICONS[stream.type] || '#'}</span>
            <span className="truncate">{stream.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

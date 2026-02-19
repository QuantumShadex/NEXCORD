'use client'
import { useEffect, useRef, useState } from 'react'
import { messagesApi } from '@/lib/api'
import { useAuthStore } from '@/store/auth.store'
import { connectSocket } from '@/lib/socket'

interface Message {
  id: string
  content: string
  created_at: string
  author: { id: string; username: string; avatar_url?: string }
}

interface Props {
  stream: { id: string; name: string; topic?: string; type: string }
}

export default function ChatArea({ stream }: Props) {
  const user = useAuthStore((s) => s.user)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // suppress unused warning — user may be used for optimistic updates later
  void user

  useEffect(() => {
    setMessages([])
    if (!stream.id) return

    messagesApi.list(stream.id).then((res) => setMessages(res.data)).catch(() => {})

    const socket = connectSocket()

    socket.emit('join_stream', { streamId: stream.id })

    const handleNewMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg])
    }
    socket.on('new_message', handleNewMessage)

    return () => {
      socket.emit('leave_stream', { streamId: stream.id })
      socket.off('new_message', handleNewMessage)
    }
  }, [stream.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    const content = input.trim()
    if (!content || loading) return
    setInput('')
    setLoading(true)
    try {
      await messagesApi.send(stream.id, { content })
    } catch {
      setInput(content)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f0f1a]">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-[#2a2a4a] bg-[#16162a]/50">
        <span className="text-[#9898b8]">#</span>
        <h2 className="text-white font-semibold text-sm">{stream.name}</h2>
        {stream.topic && (
          <>
            <span className="text-[#2a2a4a]">|</span>
            <p className="text-[#9898b8] text-xs truncate">{stream.topic}</p>
          </>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-5xl mb-4">#</div>
            <h3 className="text-white font-semibold text-lg mb-1">Welcome to #{stream.name}</h3>
            <p className="text-[#9898b8] text-sm">This is the beginning of the #{stream.name} stream.</p>
          </div>
        )}
        {messages.map((msg, i) => {
          const isConsecutive = i > 0 && messages[i - 1].author.id === msg.author.id
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 group hover:bg-[#16162a]/40 px-2 py-1 rounded-lg ${isConsecutive ? 'mt-0' : 'mt-4'}`}
            >
              {!isConsecutive ? (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {msg.author.username.slice(0, 1).toUpperCase()}
                </div>
              ) : (
                <div className="w-9 shrink-0 flex items-center justify-end">
                  <span className="text-[#9898b8] text-xs opacity-0 group-hover:opacity-100">
                    {formatTime(msg.created_at)}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                {!isConsecutive && (
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-white font-semibold text-sm">{msg.author.username}</span>
                    <span className="text-[#9898b8] text-xs">{formatTime(msg.created_at)}</span>
                  </div>
                )}
                <p className="text-[#e8e8f0] text-sm leading-relaxed break-words">{msg.content}</p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 pb-6 pt-2">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#16162a] border border-[#2a2a4a] focus-within:border-[#6366f1]/50 transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${stream.name}`}
            className="flex-1 bg-transparent text-white text-sm placeholder-[#9898b8] focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="px-3 py-1.5 rounded-lg bg-[#6366f1] text-white text-xs font-medium hover:bg-[#4f46e5] transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <p className="text-[#9898b8] text-xs mt-1 px-1">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}

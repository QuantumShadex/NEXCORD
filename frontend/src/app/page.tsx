import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-[#2a2a4a]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="font-bold text-xl text-white">NEXCORD</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-[#9898b8] hover:text-white transition-colors text-sm">
            Sign In
          </Link>
          <Link href="/auth/register" className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white text-sm font-medium hover:opacity-90 transition-opacity">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#6366f1]/30 bg-[#6366f1]/10 text-[#6366f1] text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse"></span>
          Now in Open Beta
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Where{' '}
          <span className="bg-gradient-to-r from-[#6366f1] to-[#06b6d4] bg-clip-text text-transparent">
            Communities
          </span>
          <br />Evolve.
        </h1>
        <p className="text-[#9898b8] text-lg md:text-xl max-w-2xl mb-12">
          NEXCORD is a next-generation community platform built for creators, gamers, and developers.
          Real-time chat, voice rooms, and event stages — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/auth/register" className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 neon-glow">
            Start for Free
          </Link>
          <Link href="/auth/login" className="px-8 py-4 rounded-xl border border-[#2a2a4a] text-[#e8e8f0] font-semibold text-lg hover:border-[#6366f1]/50 transition-all">
            Sign In
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-4xl w-full">
          {[
            { icon: '💬', title: 'Text Streams', desc: 'Rich messaging with threads, reactions, polls, and file sharing.' },
            { icon: '🎙️', title: 'Voice Rooms', desc: 'Crystal-clear WebRTC voice with screen sharing and spatial audio.' },
            { icon: '🎭', title: 'Event Stage', desc: 'Broadcast to your community with moderated speaker queues.' },
          ].map((f) => (
            <div key={f.title} className="p-6 rounded-2xl bg-[#16162a] border border-[#2a2a4a] hover:border-[#6366f1]/40 transition-all text-left group">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-[#9898b8] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-6 border-t border-[#2a2a4a] text-center text-[#9898b8] text-sm">
        © 2025 NEXCORD · Where Communities Evolve
      </footer>
    </div>
  )
}

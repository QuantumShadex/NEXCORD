'use client'
import { useState } from 'react'
import { spacesApi } from '@/lib/api'
import { useSpacesStore } from '@/store/spaces.store'

interface Props {
  onClose: () => void
}

export default function CreateSpaceModal({ onClose }: Props) {
  const addSpace = useSpacesStore((s) => s.addSpace)
  const [form, setForm] = useState({ name: '', description: '', is_private: false, theme_color: '#6366f1' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await spacesApi.create(form)
      addSpace(res.data)
      onClose()
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } }
      setError(e.response?.data?.message || 'Failed to create space')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#16162a] border border-[#2a2a4a] rounded-2xl p-6 w-full max-w-md mx-4">
        <h2 className="text-white font-bold text-xl mb-1">Create a Space</h2>
        <p className="text-[#9898b8] text-sm mb-6">A Space is where your community gathers.</p>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#9898b8] text-xs font-medium mb-1.5 uppercase tracking-wide">Space Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0f0f1a] border border-[#2a2a4a] text-white placeholder-[#9898b8] focus:outline-none focus:border-[#6366f1] transition-colors text-sm"
              placeholder="My Awesome Space"
              required
              minLength={2}
            />
          </div>
          <div>
            <label className="block text-[#9898b8] text-xs font-medium mb-1.5 uppercase tracking-wide">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0f0f1a] border border-[#2a2a4a] text-white placeholder-[#9898b8] focus:outline-none focus:border-[#6366f1] transition-colors text-sm"
              placeholder="What's this space about?"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_private}
                onChange={(e) => setForm({ ...form, is_private: e.target.checked })}
                className="w-4 h-4 accent-[#6366f1]"
              />
              <span className="text-[#9898b8] text-sm">Private Space</span>
            </label>
          </div>
          <div>
            <label className="block text-[#9898b8] text-xs font-medium mb-1.5 uppercase tracking-wide">Theme Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.theme_color}
                onChange={(e) => setForm({ ...form, theme_color: e.target.value })}
                className="w-10 h-10 rounded-lg border border-[#2a2a4a] bg-[#0f0f1a] cursor-pointer"
              />
              <span className="text-[#9898b8] text-sm">{form.theme_color}</span>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-[#2a2a4a] text-[#9898b8] text-sm font-medium hover:border-[#6366f1]/50 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Space'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

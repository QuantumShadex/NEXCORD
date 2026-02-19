import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NEXCORD — Where Communities Evolve',
  description: 'A modern community & real-time communication platform',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sohel dayma — Portfolio',
  description: 'Professional UI/UX Designer & Full Stack Developer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'No-Code Editor Assessment',
  description: 'Senior Developer Technical Assessment - Element Selection & Analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

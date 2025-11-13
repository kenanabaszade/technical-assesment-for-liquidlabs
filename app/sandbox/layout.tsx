import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Sandboxed App',
  description: 'User-created application running in sandbox',
}

export default function SandboxLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

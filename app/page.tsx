'use client'

import { useState } from 'react'
import EditorShell from '@/components/EditorShell'

export default function Home() {
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <main className="h-screen w-screen overflow-hidden bg-gray-100">
      <EditorShell isEditMode={isEditMode} onToggleEditMode={setIsEditMode} />
    </main>
  )
}

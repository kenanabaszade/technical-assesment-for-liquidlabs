'use client'

import { useEffect } from 'react'
import SandboxApp from '@/components/sandbox/SandboxApp'
import { useEditMode } from '@/hooks/useEditMode'

export default function SandboxPage() {
  const { isEditMode, initializeEditMode } = useEditMode()

  useEffect(() => {
    initializeEditMode()
  }, [initializeEditMode])

  return <SandboxApp isEditMode={isEditMode} />
}

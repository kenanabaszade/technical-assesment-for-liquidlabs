'use client'

import { useCallback, useState } from 'react'
import type { EditorMessage } from '@/types/editor'

export function useEditMode() {
  const [isEditMode, setIsEditMode] = useState(false)

  const initializeEditMode = useCallback(() => {
    const handleMessage = (event: MessageEvent<EditorMessage>) => {
      if (event.data.type === 'TOGGLE_EDIT_MODE') {
        setIsEditMode(event.data.payload.enabled)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return { isEditMode, initializeEditMode }
}

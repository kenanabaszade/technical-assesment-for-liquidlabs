'use client'

import { useCallback } from 'react'
import ElementSelector from './ElementSelector'
import type { ElementInfo, EditorMessage } from '@/types/editor'

// Sample components for testing
import HeroSection from './demo/HeroSection'
import FeatureGrid from './demo/FeatureGrid'
import Footer from './demo/Footer'

interface SandboxAppProps {
  isEditMode: boolean
}

export default function SandboxApp({ isEditMode }: SandboxAppProps) {
  const handleElementSelected = (info: ElementInfo) => {
    const message: EditorMessage = {
      type: 'ELEMENT_SELECTED',
      payload: info,
    }
    window.parent?.postMessage(message, '*')
  };

  return (
    <div className="min-h-screen bg-white">
      <ElementSelector isEnabled={isEditMode} onElementSelected={handleElementSelected} />

      {/* Sample application content */}
      <HeroSection />
      <FeatureGrid />
      <Footer />
    </div>
  )
}

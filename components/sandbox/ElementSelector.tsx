'use client'

import { useEffect, useRef, useState } from 'react'
import type { ElementInfo } from '@/types/editor'
import { getElementInfo } from '@/utils/elementAnalysis'

interface ElementSelectorProps {
  isEnabled: boolean
  onElementSelected: (info: ElementInfo) => void
}

export default function ElementSelector({ isEnabled, onElementSelected }: ElementSelectorProps) {
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isEnabled) {
      setHoveredElement(null)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target === overlayRef.current || target.closest('[data-element-selector]')) {
        return
      }

      setHoveredElement(target)
    }

    const handleClick = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const target = e.target as HTMLElement

      if (target === overlayRef.current || target.closest('[data-element-selector]')) {
        return
      }

      const info = getElementInfo(target)
      onElementSelected(info)
    }

    document.addEventListener('mousemove', handleMouseMove, true)
    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove, true)
      document.removeEventListener('click', handleClick, true)
    }
  }, [isEnabled, onElementSelected])

  useEffect(() => {
    if (!hoveredElement || !overlayRef.current) return

    const rect = hoveredElement.getBoundingClientRect()
    const overlay = overlayRef.current

    overlay.style.top = `${rect.top + window.scrollY}px`
    overlay.style.left = `${rect.left + window.scrollX}px`
    overlay.style.width = `${rect.width}px`
    overlay.style.height = `${rect.height}px`
  }, [hoveredElement])

  if (!isEnabled) return null

  return (
    <div
      ref={overlayRef}
      data-element-selector
      className="pointer-events-none fixed z-[9999] border-2 border-blue-500 bg-blue-500/10 transition-all duration-100"
      style={{
        display: hoveredElement ? 'block' : 'none',
      }}
    >
      {hoveredElement && (
        <div className="absolute -top-6 left-0 rounded bg-blue-500 px-2 py-1 text-xs font-medium text-white">
          {hoveredElement.tagName.toLowerCase()}
        </div>
      )}
    </div>
  )
}

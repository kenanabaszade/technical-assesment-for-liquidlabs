'use client'

import { useEffect, useRef, useState } from 'react'
import type { ElementInfo, EditorMessage } from '@/types/editor'

interface EditorShellProps {
  isEditMode: boolean
  onToggleEditMode: (enabled: boolean) => void
}

export default function EditorShell({ isEditMode, onToggleEditMode }: EditorShellProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [selectedElement, setSelectedElement] = useState<ElementInfo | null>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent<EditorMessage>) => {
      if (!event?.data) return
      if (event.data.type === 'ELEMENT_SELECTED') {
        setSelectedElement(event.data.payload)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleToggleEditMode = () => {
    const newMode = !isEditMode
    onToggleEditMode(newMode)

    const target = iframeRef.current?.contentWindow
    if (target) {
      const message: EditorMessage = {
        type: 'TOGGLE_EDIT_MODE',
        payload: { enabled: newMode },
      }
      target.postMessage(message, '*')
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">No-Code Editor</h1>
          <span className="text-sm text-gray-500">Assessment Project</span>
        </div>

        <button
          onClick={handleToggleEditMode}
          className={`rounded-lg px-4 py-2 font-medium transition-colors ${
            isEditMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {isEditMode ? '✓ Edit Mode Active' : 'Enable Edit Mode'}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sandbox Preview */}
        <div className="flex-1 overflow-hidden bg-gray-50 p-4">
          <div className="h-full w-full overflow-hidden rounded-lg border-2 border-gray-300 bg-white shadow-lg">
            <iframe
              ref={iframeRef}
              src="/sandbox"
              className="h-full w-full"
              title="Sandboxed Application"
            />
          </div>
        </div>

        {/* Inspector Panel */}
        {isEditMode && (
          <div className="w-96 overflow-y-auto border-l bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Element Inspector</h2>

            {selectedElement ? (
              <div className="space-y-6">
                {/* Component Info */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">Component</h3>
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="font-mono text-sm text-gray-900">{selectedElement.componentName}</p>
                  </div>
                </div>

                {/* Position Info */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">Position</h3>
                  <div className="space-y-2 rounded-lg bg-gray-50 p-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Line:</span>
                      <span className="font-mono text-sm font-medium text-gray-900">{selectedElement.position.line}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Column:</span>
                      <span className="font-mono text-sm font-medium text-gray-900">{selectedElement.position.column}</span>
                    </div>
                  </div>
                </div>

                {/* Parent Chain */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">Parent Components</h3>
                  <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                    {selectedElement.parentChain.map((parent, index) => (
                      <div key={index} className="font-mono text-sm text-gray-700" style={{ paddingLeft: `${index * 12}px` }}>
                        └─ {parent}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Computed Styles */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">Computed Styles</h3>
                  <div className="max-h-96 overflow-y-auto rounded-lg bg-gray-50 p-3">
                    {Object.entries(selectedElement.computedStyles).map(([key, value]) => (
                      <div key={key} className="mb-2 border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                        <div className="font-mono text-xs text-gray-600">{key}</div>
                        <div className="font-mono text-xs font-medium text-gray-900">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tag Name */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">Element Type</h3>
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="font-mono text-sm text-gray-900">&lt;{selectedElement.tagName}&gt;</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p className="mb-2">Click on any element in the preview to inspect it</p>
                <p className="text-sm">Element details will appear here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

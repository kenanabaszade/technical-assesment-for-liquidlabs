import type { ElementInfo } from '@/types/editor'

export function getElementInfo(element: HTMLElement): ElementInfo {
  const fiber = findNearestFiber(element)
  const componentName = fiber ? getDisplayNameForFiber(fiber) : element.tagName.toLowerCase()
  const parentChain = fiber ? buildParentChain(fiber) : [element.tagName.toLowerCase()]
  const position = fiber ? getSourcePosition(fiber) : { line: 0, column: 0 }

  return {
    componentName,
    position,
    parentChain,
    computedStyles: getComputedStylesObject(element),
    tagName: element.tagName.toLowerCase(),
  }
}

export function getComputedStylesObject(element: HTMLElement): Record<string, string> {
  const computed = window.getComputedStyle(element)
  const styles: Record<string, string> = {}

  const properties = [
    'display',
    'position',
    'width',
    'height',
    'padding',
    'margin',
    'border',
    'backgroundColor',
    'color',
    'fontSize',
    'fontFamily',
    'fontWeight',
    'lineHeight',
    'textAlign',
    'flexDirection',
    'justifyContent',
    'alignItems',
    'gap',
    'zIndex',
    'opacity',
    'transform',
    'transition',
  ]

  properties.forEach(prop => {
    styles[prop] = computed.getPropertyValue(prop)
  })

  return styles
}

function findNearestFiber(node: Node | null): any | null {
  let current: any = node
  while (current) {
    const fiber = getFiberFromHostNode(current)
    if (fiber) return fiber
    current = current.parentNode
  }
  return null
}

function getFiberFromHostNode(node: any): any | null {
  if (!node) return null
  for (const key in node) {
    if (key.startsWith('__reactFiber$')) {
      return node[key]
    }
  }
  for (const key in node) {
    if (key.startsWith('__reactContainer$')) {
      return node[key]
    }
  }
  return null
}

function getDisplayNameForFiber(fiber: any): string {
  const type = fiber?.type
  if (!type) {
    if (typeof fiber?.elementType === 'string') return fiber.elementType
    return getFiberTagNameFallback(fiber)
  }

  if (typeof type === 'string') {
    return type
  }

  const displayName = type.displayName || type.name
  if (displayName) return displayName
  return getFiberTagNameFallback(fiber)
}

function getFiberTagNameFallback(fiber: any): string {
  const tag = fiber?.tag
  switch (tag) {
    case 5:
      return typeof fiber?.type === 'string' ? fiber.type : 'host'
    default:
      return 'Anonymous'
  }
}

function isFrameworkInternal(name: string): boolean {
  if (!name) return true
  const lowered = name.toLowerCase()
  if (lowered === 'hostroot' || lowered === 'root') return true
  if (lowered === 'fragment') return true
  if (lowered === 'suspense' || lowered === 'suspenselist') return true
  if (lowered === 'offscreen') return true
  if (lowered === 'anonymous') return true
  return false
}

function buildParentChain(leafFiber: any): string[] {
  const chain: string[] = []
  let current: any = leafFiber
  while (current) {
    const name = getDisplayNameForFiber(current)
    if (!isFrameworkInternal(name)) {
      chain.push(name)
    }
    current = current.return
  }
  return chain.reverse()
}

function getSourcePosition(startFiber: any): { line: number; column: number } {
  let current: any = startFiber
  while (current) {
    const debugSrc = current._debugSource
    if (debugSrc) {
      const line = Number(debugSrc.lineNumber ?? debugSrc.line ?? 0) || 0
      const column = Number(debugSrc.columnNumber ?? debugSrc.column ?? 0) || 0
      return { line, column }
    }
    const props = current.pendingProps || current.memoizedProps
    const jsxSource = props?.__source
    if (jsxSource) {
      const line = Number(jsxSource.lineNumber ?? jsxSource.line ?? 0) || 0
      const column = Number(jsxSource.columnNumber ?? jsxSource.column ?? 0) || 0
      return { line, column }
    }
    current = current.return
  }
  return { line: 0, column: 0 }
}

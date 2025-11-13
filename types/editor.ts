export interface ElementPosition {
  line: number
  column: number
}

export interface ElementInfo {
  componentName: string
  position: ElementPosition
  parentChain: string[]
  computedStyles: Record<string, string>
  tagName: string
}

export type EditorMessage =
  | {
      type: 'TOGGLE_EDIT_MODE'
      payload: { enabled: boolean }
    }
  | {
      type: 'ELEMENT_SELECTED'
      payload: ElementInfo
    }
  | {
      type: 'ELEMENT_HOVERED'
      payload: ElementInfo | null
    }

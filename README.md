# No-Code Editor - Technical Assessment

## Overview

This is a technical assessment for senior developers. You'll be building the core element inspection system for a no-code platform similar to Lovable and v0.

## The Challenge

Users can create websites and webapps by prompting. When they click an "Edit" button, the editing mode activates in the sandboxed Next.js/React app. Users can then click on any element to inspect it.

**Your task:** Implement the element analysis system that extracts information about the selected element.

## What You Need to Implement

The most important parts are:

### 1. React Component Hierarchy (Critical)
Extract the complete component hierarchy from React Fiber, showing which components wrap the selected element from root to leaf.

**Example output:**
```typescript
parentChain: ['App', 'SandboxApp', 'HeroSection', 'div', 'button']
```

### 2. Exact Source Code Position (Critical)
Get the exact line number and column number where the selected element is defined in the source code.

**Example output:**
```typescript
position: {
  line: 42,
  column: 8
}
```

### 3. Component Name
Identify the React component name (not just the HTML tag).

### 4. Computed Styles
Already implemented - extract CSS computed styles from the element.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000, click "Enable Edit Mode", and try clicking on elements. You'll see mock data in the inspector panel.

## Where to Work

Your main implementation goes in:
- **`utils/elementAnalysis.ts`** - Implement the `getElementInfo()` function

## Key Requirements

- Extract React Fiber information from DOM elements
- Traverse the Fiber tree to build component hierarchy
- Get source code position (line and column numbers)
- Filter out React framework internals from the hierarchy
- Handle edge cases gracefully

## Important Constraints

- **No custom HTML attributes allowed** - Do not add `data-file-path`, `data-line-number`, or any other data attributes to components
- **All information must come from React Fiber** - Extract everything directly from the Fiber instance attached to DOM elements

## Evaluation

We're looking for:
- Working implementation that extracts real data (not mock values)
- Understanding of React internals and Fiber architecture
- Clean, readable code
- Proper error handling

Time expectation: 4-8 hours

Good luck! 🚀

import type { TreeNode } from '@/constants/tree-data'
import useClickOutside from '@/hook/use-click-outside'
import { useState } from 'react'
import type React from 'react'

export const findParentById = (
  tree: TreeNode[],
  id: string,
  parent: TreeNode | null = null
): TreeNode | null => {
  for (const node of tree) {
    if (node.id === id) return parent
    const found = findParentById(node.nodes, id, node)
    if (found) return found
  }
  return null
}

export const findSiblings = (tree: TreeNode[], id: string): TreeNode[] => {
  const parent = findParentById(tree, id)
  return parent ? parent.nodes : tree
}

export const useTreeSelection = (
  treeData: TreeNode[],
  isRangeSelection: boolean,
  containerRef: React.RefObject<HTMLElement>
) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [lastClickedId, setLastClickedId] = useState<string | null>(null)

  useClickOutside(containerRef, () => setSelectedIds([]))

  const handleSelect = (data: TreeNode, event: React.MouseEvent) => {
    const id = data.id
    const siblings = findSiblings(treeData, id)
    const currentIndex = siblings.findIndex((node) => node.id === id)
    const lastClickedIndex = siblings.findIndex(
      (node) => node.id === lastClickedId
    )
    const isSameParent =
      findParentById(treeData, id) ===
      findParentById(treeData, lastClickedId ?? '')

    if (event.metaKey || (event.ctrlKey && lastClickedId)) {
      if (isSameParent) {
        setSelectedIds((prev) =>
          prev.includes(id)
            ? prev.filter((selectedId) => selectedId !== id)
            : [...prev, id]
        )
      }
    } else if (isRangeSelection && event.shiftKey && isSameParent) {
      if (currentIndex !== -1 && lastClickedIndex !== -1) {
        const startIndex = Math.min(currentIndex, lastClickedIndex)
        const endIndex = Math.max(currentIndex, lastClickedIndex)
        const itemsToSelect = siblings
          .slice(startIndex, endIndex + 1)
          .map((node) => node.id)
        setSelectedIds((prev) =>
          Array.from(new Set([...prev, ...itemsToSelect]))
        )
      }
    } else {
      setSelectedIds([id])
      setLastClickedId(id)
    }
  }

  return { selectedIds, handleSelect, setSelectedIds, setLastClickedId }
}

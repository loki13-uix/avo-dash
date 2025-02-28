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

export const isParentOfSelected = (
  tree: TreeNode[],
  parentId: string,
  selectedIds: string[]
): boolean => {
  for (const id of selectedIds) {
    let current = findParentById(tree, id)
    while (current) {
      if (current.id === parentId) return true
      current = findParentById(tree, current.id)
    }
  }
  return false
}

export const isChildOfSelected = (
  tree: TreeNode[],
  childId: string,
  selectedIds: string[]
): string | null => {
  let current = findParentById(tree, childId)
  while (current) {
    if (selectedIds.includes(current.id)) {
      return current.id
    }
    current = findParentById(tree, current.id)
  }
  return null
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

    if (isParentOfSelected(treeData, id, selectedIds)) {
      return
    }

    const parentId = isChildOfSelected(treeData, id, selectedIds)
    if (parentId) {
      setSelectedIds((prev) => {
        const filtered = prev.filter((selectedId) => selectedId !== parentId)
        return [...filtered, id]
      })
      setLastClickedId(id)
      return
    }

    if (event.metaKey || event.ctrlKey) {
      setSelectedIds((prev) =>
        prev.includes(id)
          ? prev.filter((selectedId) => selectedId !== id)
          : [...prev, id]
      )
      setLastClickedId(id)
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

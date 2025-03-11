import type { TreeNode } from '@/constants/tree-data'
import useClickOutside from '@/hook/use-click-outside'
import {
  getParentNodeById,
  getSelectedParentOfChild,
  getSiblingsById,
  isSelectedNodeHaveParent,
} from '@/utils/tree'
import { useState } from 'react'
import type React from 'react'

export const useTreeSelection = <T extends HTMLElement | null>(
  treeData: TreeNode[],
  isRangeSelection: boolean,
  containerRef: React.RefObject<T>
) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [lastClickedId, setLastClickedId] = useState<string | null>(null)

  useClickOutside(containerRef, () => setSelectedIds([]))

  const handleSelect = (data: TreeNode, event: React.MouseEvent) => {
    const id = data.id
    const siblings = getSiblingsById(treeData, id)
    const currentIndex = siblings.findIndex((node) => node.id === id)
    const lastClickedIndex = siblings.findIndex(
      (node) => node.id === lastClickedId
    )
    const isSameParent =
      getParentNodeById(treeData, id) ===
      getParentNodeById(treeData, lastClickedId ?? '')

    const parentId = getSelectedParentOfChild(treeData, id, selectedIds)
    if (parentId) {
      setSelectedIds((prev) => {
        const filtered = prev.filter((selectedId) => selectedId !== parentId)
        return [...filtered, id]
      })
      setLastClickedId(id)
      return
    }

    if (event.metaKey || event.ctrlKey) {
      if (isSelectedNodeHaveParent(treeData, id, selectedIds)) {
        return
      }
      setSelectedIds((prev) =>
        prev.includes(id)
          ? prev.filter((selectedId) => selectedId !== id)
          : [...prev, id]
      )
      setLastClickedId(id)
    } else if (isRangeSelection && event.shiftKey && isSameParent) {
      if (isSelectedNodeHaveParent(treeData, id, selectedIds)) {
        return
      }
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

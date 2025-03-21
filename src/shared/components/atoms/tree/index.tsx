import type { TreeNode } from '@/constants/tree-data'
import { useTreeSelection } from '@/hook/use-tree-selection'
import {} from '@/lib/utils'
import { RenderPreview } from '@/shared/components/atoms/tree/preview-overlay'
import { SortableTreeNode } from '@/shared/components/atoms/tree/sortable-treenode'
import { useTreeContext } from '@/shared/context/tree-data-context'
import {
  findNodeById,
  getParentFolderIds,
  getParentNodeById,
  isDescendant,
  removeNodeById,
} from '@/utils/tree'
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useRef, useState } from 'react'
import type React from 'react'

export type Edge = 'top' | 'bottom' | 'left' | 'right'

function Tree({ isHeaderExpanded }: { isHeaderExpanded: boolean }) {
  const { treeNodes, setTreeNodes } = useTreeContext()
  const [expandedFolders, setExpandedFolders] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [draggedNode, setDraggedNode] = useState<TreeNode | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const { selectedIds, handleSelect } = useTreeSelection(
    treeNodes,
    true,
    containerRef as React.RefObject<HTMLElement>
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)

    const node = findNodeById(treeNodes, active.id as string)
    if (node) {
      setDraggedNode(node)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event
    if (over?.id !== activeId) {
      setTimeout(() => {
        setExpandedFolders((prev) => [...prev, over?.id as string])
      }, 2000)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setDraggedNode(null)
    if (!over) return

    const sourceId = active.id as string
    const targetId = over.id as string
    if (selectedIds.includes(targetId) || sourceId === targetId) return

    const sourceNode = findNodeById(treeNodes, sourceId)
    const targetNode = findNodeById(treeNodes, targetId)

    if (
      !sourceNode ||
      !targetNode ||
      (sourceNode.variant === 'folder' && isDescendant(sourceNode, targetId))
    )
      return

    let newTreeNodes = [...treeNodes]
    const nodesToMove =
      selectedIds.includes(sourceId) && selectedIds.length > 1
        ? selectedIds
            .map((id) => findNodeById(newTreeNodes, id))
            .filter(Boolean)
        : [sourceNode]

    for (const node of nodesToMove) {
      newTreeNodes = removeNodeById(newTreeNodes, node?.id ?? '')
    }

    const targetNodeInNewTree = findNodeById(newTreeNodes, targetId)
    const targetParent =
      targetNode.variant !== 'folder'
        ? getParentNodeById(treeNodes, targetId)
        : null

    const targetParentInNewTree = targetParent
      ? findNodeById(newTreeNodes, targetParent.id)
      : null

    for (const node of nodesToMove) {
      if (!node) continue
      if (targetNode.variant === 'folder' && targetNodeInNewTree) {
        // Add to target folder
        targetNodeInNewTree.nodes.unshift(node)
      } else if (targetParentInNewTree) {
        // Add next to target file in its parent folder
        const targetIndex = targetParentInNewTree.nodes.findIndex(
          (n) => n.id === targetId
        )
        if (targetIndex !== -1) {
          targetParentInNewTree.nodes.splice(targetIndex, 0, node)
        } else {
          targetParentInNewTree.nodes.unshift(node)
        }
      } else {
        // Add to root folder
        newTreeNodes.unshift(node)
      }
    }

    setTreeNodes(newTreeNodes)

    const targetParentFolders = getParentFolderIds(newTreeNodes, targetId)
    const foldersToExpand = [...targetParentFolders]

    if (targetNode.variant === 'folder') {
      foldersToExpand.push(targetId)
    }

    setExpandedFolders(foldersToExpand)
  }

  const handleDragCancel = () => {
    setActiveId(null)
    setDraggedNode(null)
  }

  return (
    <div className='select-none' ref={containerRef}>
      {isHeaderExpanded && (
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={treeNodes.map((node) => node.id)}
            strategy={verticalListSortingStrategy}
          >
            {treeNodes.map((node) => (
              <SortableTreeNode
                key={node.id}
                node={node}
                level={0}
                selectedIds={selectedIds}
                activeId={activeId ?? ''}
                expandedFolders={expandedFolders}
                setExpandedFolders={setExpandedFolders}
                handleSelect={handleSelect}
              />
            ))}
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <RenderPreview
                draggedNode={draggedNode}
                selectedIds={selectedIds}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  )
}

export default Tree

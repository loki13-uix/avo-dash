import type { TreeNode } from '@/constants/tree-data'
import { useTreeSelection } from '@/hook/use-tree-selection'
import { calcPadLeft, cn } from '@/lib/utils'
import FileItem from '@/shared/components/atoms/file'
import FolderItem from '@/shared/components/atoms/folder'
import { DropIndicator } from '@/shared/components/atoms/tree/drop-indicator'
import { RenderPreview } from '@/shared/components/atoms/tree/preview-overlay'
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
import { useSortable } from '@dnd-kit/sortable'
import { useRef, useState } from 'react'
import type React from 'react'

type TreeNodeProps = {
  node: TreeNode
  level: number
}

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

    if (selectedIds.includes(targetId)) return

    if (sourceId === targetId) return

    const sourceNode = findNodeById(treeNodes, sourceId)
    const targetNode = findNodeById(treeNodes, targetId)

    if (!sourceNode || !targetNode) return

    if (sourceNode.variant === 'folder' && isDescendant(sourceNode, targetId))
      return

    let newTreeNodes = [...treeNodes]
    // If we have multiple selected items
    if (selectedIds.includes(sourceId) && selectedIds.length > 1) {
      for (const id of selectedIds) {
        const node = findNodeById(newTreeNodes, id)
        if (!node) continue

        newTreeNodes = removeNodeById(newTreeNodes, id)
        const targetNodeInNewTree = findNodeById(newTreeNodes, targetId)

        if (targetNode.variant === 'folder') {
          if (targetNodeInNewTree) {
            targetNodeInNewTree.nodes.unshift(node)
          }
        } else {
          const targetParent = getParentNodeById(treeNodes, targetId)
          if (targetParent) {
            const targetParentInNewTree = findNodeById(
              newTreeNodes,
              targetParent.id
            )
            if (targetParentInNewTree) {
              // Find index of target in its parent
              const targetIndex = targetParentInNewTree.nodes.findIndex(
                (n) => n.id === targetId
              )
              if (targetIndex !== -1) {
                targetParentInNewTree.nodes.splice(targetIndex, 0, node)
              } else {
                targetParentInNewTree.nodes.unshift(node)
              }
            }
          } else {
            newTreeNodes.unshift(node)
          }
        }
      }
    } else {
      // Move single node
      const node = sourceNode

      // Remove node from its current location
      newTreeNodes = removeNodeById(newTreeNodes, sourceId)
      const targetNodeInNewTree = findNodeById(newTreeNodes, targetId)

      // Add node to target folder if target is a folder, otherwise to target's parent
      if (targetNode.variant === 'folder') {
        if (targetNodeInNewTree) {
          targetNodeInNewTree.nodes.unshift(node)
        }
      } else {
        // Find parent of target to add next to target
        const targetParent = getParentNodeById(treeNodes, targetId)
        if (targetParent) {
          const targetParentInNewTree = findNodeById(
            newTreeNodes,
            targetParent.id
          )
          if (targetParentInNewTree) {
            // Find index of target in its parent
            const targetIndex = targetParentInNewTree.nodes.findIndex(
              (n) => n.id === targetId
            )
            if (targetIndex !== -1) {
              targetParentInNewTree.nodes.splice(targetIndex, 0, node)
            } else {
              targetParentInNewTree.nodes.unshift(node)
            }
          }
        } else {
          newTreeNodes.unshift(node)
        }
      }
    }

    setTreeNodes(newTreeNodes)

    const targetParentFolders = getParentFolderIds(newTreeNodes, targetId)

    // 2. Add the target folder itself if it's a folder
    const foldersToExpand = [...targetParentFolders]
    if (targetNode.variant === 'folder') {
      foldersToExpand.push(targetId)
    }

    // 3. Set only these folders as expanded
    setExpandedFolders(foldersToExpand)
  }

  const handleDragCancel = () => {
    setActiveId(null)
    setDraggedNode(null)
  }

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) =>
      prev.includes(id)
        ? prev.filter((folderId) => folderId !== id)
        : [...prev, id]
    )
  }

  function SortableTreeNode({ node, level }: TreeNodeProps) {
    const { attributes, listeners, setNodeRef, isDragging, isOver, over } =
      useSortable({
        id: node.id,
        data: {
          type: node.variant,
          node,
        },
      })

    const isSelected = selectedIds.includes(node.id)

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={cn('relative', isDragging && 'opacity-40')}
      >
        <TreeNodeComponent node={node} level={level} isDragOver={isOver} />
        {isOver &&
          node.variant !== 'folder' &&
          over?.id !== activeId &&
          !isSelected && <DropIndicator />}
      </div>
    )
  }

  function TreeNodeComponent({
    node,
    level,
    isDragOver,
  }: TreeNodeProps & { isDragOver?: boolean }) {
    const isSelected = selectedIds.includes(node.id)

    if (node.variant === 'file') {
      return (
        <FileItem
          fileName={node.name}
          id={node.id}
          data={node.data}
          isSelected={isSelected}
          canRename={true}
          selectedIds={selectedIds}
          onSelect={(e) =>
            handleSelect(node, e as React.MouseEvent<HTMLDivElement>)
          }
          style={{ paddingLeft: calcPadLeft(level) }}
        />
      )
    }

    return (
      <FolderItem
        name={node.name}
        id={node.id}
        isSelected={isSelected}
        key={node.id}
        isExpanded={expandedFolders.includes(node.id)}
        onToggle={() => toggleFolder(node.id)}
        onSelect={(e) =>
          handleSelect(node, e as React.MouseEvent<HTMLDivElement>)
        }
        selectedIds={selectedIds}
        style={{ paddingLeft: calcPadLeft(level) }}
        className={cn(
          'flex gap-2',
          isDragOver &&
            !isSelected &&
            'bg-grey-2 border border-dashed border-purple-primary w-full rounded-sm'
        )}
      >
        <div>
          <SortableContext
            items={node.nodes.map((node) => node.id)}
            strategy={verticalListSortingStrategy}
          >
            {node.nodes?.map((childNode) => (
              <SortableTreeNode
                key={childNode.id}
                node={childNode}
                level={level + 1}
              />
            ))}
          </SortableContext>
        </div>
      </FolderItem>
    )
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
              <SortableTreeNode key={node.id} node={node} level={0} />
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

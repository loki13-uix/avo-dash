import { type TreeNode, folderTree } from '@/constants/tree-data'
import { useRef, useState } from 'react'
import FolderItem from '@/shared/components/atoms/folder'
import { useTreeSelection } from '@/hook/use-tree-selection'
import type React from 'react'
import FileItem from '@/shared/components/atoms/file'
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
  rectIntersection,
} from '@dnd-kit/core'
import {
  findNodeById,
  isDescendant,
  removeNode,
  findParentNode,
  calcPadLeft,
  getParentFolderIds,
} from '@/lib/utils'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { RenderPreview } from '@/shared/components/atoms/tree/preview-overlay'
import { DropIndicator } from '@/shared/components/atoms/tree/drop-indicator'

type TreeNodeProps = {
  node: TreeNode
  level: number
}

export type Edge = 'top' | 'bottom' | 'left' | 'right'

function Tree() {
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>(folderTree)
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setDraggedNode(null)

    if (!over) return

    const sourceId = active.id as string
    const targetId = over.id as string

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

        newTreeNodes = removeNode(newTreeNodes, id)
        const targetNodeInNewTree = findNodeById(newTreeNodes, targetId)

        if (targetNode.variant === 'folder') {
          if (targetNodeInNewTree) {
            targetNodeInNewTree.nodes.unshift(node)
          }
        } else {
          const targetParent = findParentNode(treeNodes, targetId)
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
      newTreeNodes = removeNode(newTreeNodes, sourceId)
      const targetNodeInNewTree = findNodeById(newTreeNodes, targetId)

      // Add node to target folder if target is a folder, otherwise to target's parent
      if (targetNode.variant === 'folder') {
        if (targetNodeInNewTree) {
          targetNodeInNewTree.nodes.unshift(node)
        }
      } else {
        // Find parent of target to add next to target
        const targetParent = findParentNode(treeNodes, targetId)
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
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
      isOver,
    } = useSortable({
      id: node.id,
      data: {
        type: node.variant,
        node,
      },
    })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.4 : 1,
    }

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className='relative'
      >
        <TreeNodeComponent node={node} level={level} />
        {isOver && <DropIndicator edge='bottom' gap='2px' />}
      </div>
    )
  }

  function TreeNodeComponent({ node, level }: TreeNodeProps) {
    const isSelected = selectedIds.includes(node.id)

    if (node.variant === 'file') {
      return (
        <FileItem
          fileName={node.name}
          id={node.id}
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
        isSelected={isSelected}
        key={node.id}
        isExpanded={expandedFolders.includes(node.id)}
        onToggle={() => toggleFolder(node.id)}
        onSelect={(e) =>
          handleSelect(node, e as React.MouseEvent<HTMLDivElement>)
        }
        selectedIds={selectedIds}
        style={{ paddingLeft: calcPadLeft(level) }}
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
    <div
      className='w-96 h-full min-h-[100vh] overflow-auto shadow-xl p-3  select-none'
      ref={containerRef}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
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
    </div>
  )
}

export default Tree

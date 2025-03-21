import type { TreeNode } from '@/constants/tree-data'
import { cn } from '@/lib/utils'
import { DropIndicator } from '@/shared/components/atoms/tree/drop-indicator'
import { TreeNodeComponent } from '@/shared/components/atoms/tree/tree-node'
import { useSortable } from '@dnd-kit/sortable'
import type React from 'react'

interface SortableTreeNodeProps {
  node: TreeNode
  level: number
  selectedIds: string[]
  activeId: string
  expandedFolders: string[]
  setExpandedFolders: React.Dispatch<React.SetStateAction<string[]>>
  handleSelect: (node: TreeNode, e: React.MouseEvent<HTMLDivElement>) => void
}

export function SortableTreeNode({
  node,
  level,
  selectedIds,
  activeId,
  expandedFolders,
  setExpandedFolders,
  handleSelect,
}: SortableTreeNodeProps) {
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
      <TreeNodeComponent
        node={node}
        level={level}
        isDragOver={isOver}
        selectedIds={selectedIds}
        activeId={activeId}
        expandedFolders={expandedFolders}
        setExpandedFolders={setExpandedFolders}
        handleSelect={handleSelect}
      />
      {isOver &&
        node.variant !== 'folder' &&
        over?.id !== activeId &&
        !isSelected && <DropIndicator />}
    </div>
  )
}

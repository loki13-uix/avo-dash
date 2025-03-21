import { verticalListSortingStrategy } from '@dnd-kit/sortable'

import type { TreeNode } from '@/constants/tree-data'
import { calcPadLeft, cn } from '@/lib/utils'
import FileItem from '@/shared/components/atoms/file'
import FolderItem from '@/shared/components/atoms/folder'
import { SortableTreeNode } from '@/shared/components/atoms/tree/sortable-treenode'
import { SortableContext } from '@dnd-kit/sortable'
import type React from 'react'

interface TreeNodeComponentProps {
  node: TreeNode
  level: number
  isDragOver?: boolean
  selectedIds: string[]
  expandedFolders: string[]
  setExpandedFolders: React.Dispatch<React.SetStateAction<string[]>>
  handleSelect: (node: TreeNode, e: React.MouseEvent<HTMLDivElement>) => void
  activeId: string
}

export function TreeNodeComponent({
  node,
  level,
  isDragOver,
  selectedIds,
  expandedFolders,
  setExpandedFolders,
  handleSelect,
  activeId,
}: TreeNodeComponentProps) {
  const isSelected = selectedIds.includes(node.id)

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) =>
      prev.includes(id)
        ? prev.filter((folderId) => folderId !== id)
        : [...prev, id]
    )
  }

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
              selectedIds={selectedIds}
              activeId={activeId ?? ''}
              expandedFolders={expandedFolders}
              setExpandedFolders={setExpandedFolders}
              handleSelect={handleSelect}
            />
          ))}
        </SortableContext>
      </div>
    </FolderItem>
  )
}

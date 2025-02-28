import type { TreeNode } from '@/constants/tree-data'
import FileItem from '@/shared/components/atoms/file'
import FolderItem from '@/shared/components/atoms/folder'

export function RenderPreview({
  draggedNode,
  selectedIds,
}: {
  draggedNode: TreeNode | null
  selectedIds: string[]
}) {
  if (!draggedNode) return null

  if (draggedNode.variant === 'file') {
    return (
      <FileItem
        fileName={draggedNode.name}
        id={draggedNode.id}
        isSelected={true}
        canRename={false}
        selectedIds={selectedIds}
        isPreview={true}
        onSelect={() => {}}
      />
    )
  }

  return (
    <FolderItem
      id={draggedNode.id}
      name={draggedNode.name}
      isSelected={true}
      key={draggedNode.id}
      isExpanded={false}
      onToggle={() => {}}
      onSelect={() => {}}
      isPreview={true}
      selectedIds={selectedIds}
    />
  )
}

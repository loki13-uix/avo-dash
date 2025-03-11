import type { TreeNode } from '@/constants/tree-data'
import TextField from '@/shared/components/atoms/text-field'
import Tree from '@/shared/components/atoms/tree'
import TreeHeader from '@/shared/components/atoms/tree/tree-header'
import { TreeProvider } from '@/shared/context/tree-data-context'

interface TreeWrapperProps {
  initialTreeNodes: TreeNode[]
  isExpanded: boolean
  onExpand: () => void
  onCollapse: () => void
}

function TreeWrapper({
  initialTreeNodes,
  isExpanded,
  onExpand,
  onCollapse,
}: TreeWrapperProps) {
  const handleToggle = () => {
    if (isExpanded) {
      onCollapse()
    } else {
      onExpand()
    }
  }

  return (
    <TreeProvider initialTreeNodes={initialTreeNodes}>
      <div className='flex flex-col gap-2 p-3 transition-all duration-250 h-full'>
        <TreeHeader isExpanded={isExpanded} setIsExpanded={handleToggle} />
        {isExpanded && (
          <>
            <TextField
              showIcon={false}
              className='w-full mb-4'
              placeholder='Search...'
            />
            <div className='overflow-y-auto'>
              <Tree isHeaderExpanded={isExpanded} />
            </div>
          </>
        )}
      </div>
    </TreeProvider>
  )
}

export default TreeWrapper

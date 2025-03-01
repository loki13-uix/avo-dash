import { cn } from '@/lib/utils'
import type React from 'react'
interface CellPreviewProps<TData> {
  draggedNode: TData
  isMultiple?: boolean
  className?: string
  renderNode?: (node: TData) => React.ReactNode
}

export const CellPreview: React.FC<CellPreviewProps<TData>> = ({
  draggedNode,
  isMultiple = true,
  className,
  renderNode = (node) => (
    <div className='flex items-center gap-2'>
      <input type='checkbox' checked readOnly className='w-4 h-4' />
      <div className='flex gap-2'>
        {Object.values(node).map((value, index) => (
          <span key={index} className='truncate max-w-[100px]'>
            {String(value)}
          </span>
        ))}
      </div>
    </div>
  ),
}) => {
  return (
    <div className={cn('relative', className)}>
      {renderNode(draggedNode)}
      {isMultiple && (
        <div
          className='absolute -top-1 -right-1 w-3 h-3 bg-purple-100 border border-purple-500 transform rotate-45 shadow-md'
          style={{
            transform: 'translate(50%, -50%) rotate(45deg)',
            boxShadow:
              '1px 1px 2px rgba(168, 85, 247, 0.4), -1px -1px 2px rgba(168, 85, 247, 0.4)',
          }}
        />
      )}
    </div>
  )
}

import useRename from '@/hook/use-rename-hook'
import { cn } from '@/lib/utils'
import type React from 'react'
import { useRef } from 'react'
import { Input } from '../ui/input'
import { Icon } from './icon'

type FileItemProps = {
  name: string
  id: string
  onRenameSubmit: (name: string) => void
  isSelected: boolean
  canRename?: boolean
} & React.HTMLAttributes<HTMLDivElement>

function FileItem({
  name,
  isSelected,
  onRenameSubmit,
  canRename = true,
  ...props
}: FileItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const {
    isRenaming,
    newName,
    handleRename: onRename,
    handleCancel,
  } = useRename({
    name,
    onSubmit: onRenameSubmit,
    ref,
    canRename,
  })

  return (
    <div
      ref={ref}
      data-selected={isSelected}
      className={cn(
        'flex items-center p-2 [data-selected="true"]:bg-purple-1 py-1.5 px-2 hover:bg-purple-0 w-full gap-2',
        props.className
      )}
      {...props}
    >
      <Icon name='test-case' size={16} className='fill-grey-12' />

      <div className='flex-1'>
        {!isRenaming ? (
          <p className='text-sm text-[#495057] text-wrap uppercase'>{name}</p>
        ) : (
          <Input
            type='text'
            value={newName}
            onChange={(e) => onRename(e.target.value)}
            onBlur={handleCancel}
            className='border border-purple-primary-hover bg-white rounded-sm'
          />
        )}
      </div>
    </div>
  )
}

export default FileItem

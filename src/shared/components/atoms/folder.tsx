import useRename from '@/hook/use-rename-hook'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Icon } from './icon'

type FolderItemProps = {
  id: string
  name: string
  onRenameSubmit: (name: string) => void
  initialIsOpen?: boolean
  isSelected?: boolean
  children?: ReactNode
}

function FolderItem({
  name,
  onRenameSubmit,
  initialIsOpen = false,
  isSelected = false,
  children,
}: FolderItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(initialIsOpen)

  const { isRenaming, newName, handleRename, handleCancel } = useRename({
    name,
    onSubmit: onRenameSubmit,
    onCancel: () => {},
    ref,
  })

  // Sync the initialIsOpen state with the isOpen state
  useEffect(() => {
    setIsOpen(initialIsOpen)
  }, [initialIsOpen])

  return (
    <>
      <div
        ref={ref}
        data-selected={isSelected}
        className={cn(
          'flex items-center p-2 gap-2 data-[selected="true"]:bg-purple-1'
        )}
      >
        <Icon
          name={'chevron'}
          size={16}
          className={cn('fill-grey-12', isOpen ? 'rotate-270' : 'rotate-180')}
          onClick={() => setIsOpen(!isOpen)}
        />

        <Icon name='folder' size={16} className='fill-grey-12' />

        {isRenaming ? (
          <input
            type='text'
            value={newName}
            onChange={(e) => handleRename(e.target.value)}
            onBlur={handleCancel}
            className='p-1 border rounded'
          />
        ) : (
          <span className='text-sm text-grey-12 text-wrap'>{name}</span>
        )}
      </div>

      {isOpen && children}
    </>
  )
}

export default FolderItem

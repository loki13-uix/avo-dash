import { cn } from '@/lib/utils'
import { useTreeContext } from '@/shared/context/tree-data-context'
import useFileStore from '@/shared/store/store'
import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import { Icon } from './icon'
type FileItemProps = {
  id: string
  canRename?: boolean
  fileName: string
  className?: string
  onSelect?: (event: React.MouseEvent) => void
  isSelected?: boolean
  selectedIds: string[]
  isPreview?: boolean
  data?: {
    id: string
    name: string
    email: string
    phone: string
    address: string
    age: number
  }[]
} & React.HTMLAttributes<HTMLDivElement>

function FileItem({
  id,
  isSelected,
  canRename = true,
  fileName,
  className,
  onSelect,
  selectedIds,
  isPreview,
  data,
  ...props
}: FileItemProps) {
  const { updateTreeNodeName } = useTreeContext()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(fileName)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const setSelectedFile = useFileStore((state) => state.setSelectedFile)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    clickTimeout.current = setTimeout(() => {
      onSelect?.(e)
      setSelectedFile(data ?? [])
      clickTimeout.current = null
    }, 0)
  }

  const handleDoubleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current)
      clickTimeout.current = null
    }
    if (canRename) {
      setIsEditing(true)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false)
      updateTreeNodeName(id, name)
    }
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const textarea = inputRef.current
      const height = textarea.scrollHeight ?? 0
      textarea.style.height = height > 0 ? `${height}px` : 'auto'
      textarea.select()
    }
  }, [isEditing])

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.target.value)
    const textarea = inputRef.current
    if (textarea) {
      const height = textarea.scrollHeight ?? 0
      textarea.style.height = height > 0 ? `${height}px` : 'auto'
    }
  }

  return (
    <div
      className={cn(
        'flex items-start min-h-8 py-1 px-2 hover:bg-purple-0 w-full gap-2 !cursor-pointer',
        isSelected && 'bg-purple-1 hover:bg-purple-1',
        isPreview && 'border border-purple-primary rounded-[4px] opacity-60',
        className
      )}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      {...props}
    >
      <Icon
        name='test-case'
        size={16}
        className='text-grey-12 mt-1 shrink-0 cursor-pointer'
      />

      {!isEditing ? (
        <div className='flex justify-between items-start w-full'>
          <span className='text-grey text-sm px-1 py-[0.8px] break-all'>
            {name}
          </span>
          {isPreview && isSelected && selectedIds.length > 1 && (
            <div className='absolute -left-1 -top-1 right-1 h-full bg-purple-1 border border-purple-primary -z-10 rounded-[4px]' />
          )}
        </div>
      ) : (
        <textarea
          ref={inputRef}
          value={name}
          onChange={onTextChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={cn(
            'text-grey text-sm resize-none overflow-hidden',
            'border border-purple-primary rounded-sm focus:outline-none px-[3px] py-0 w-full bg-white'
          )}
          spellCheck={false}
          rows={1}
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  )
}

export default FileItem

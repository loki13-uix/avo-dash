import { cn, setNameToTreeNode } from '@/lib/utils'
import { useTreeContext } from '@/shared/context/tree-data-context'
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
  ...props
}: FileItemProps) {
  const { treeNodes, setTreeNodes } = useTreeContext()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(fileName)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    clickTimeout.current = setTimeout(() => {
      onSelect?.(e)
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
      setNameToTreeNode(name, id, treeNodes, setTreeNodes)
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
      data-selected={isSelected}
      className={cn(
        'flex items-start min-h-8 py-1 px-2 hover:bg-purple-0 w-full gap-2',
        isSelected && 'bg-purple-1 hover:bg-purple-1',
        className
      )}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      {...props}
    >
      <Icon name='test-case' size={16} className='fill-grey-12 mt-1 shrink-0' />

      {!isEditing ? (
        <div className='flex justify-between items-start w-full'>
          <span className='text-grey text-[13px] px-1 py-[0.8px] break-all'>
            {name}
          </span>
          {isPreview && isSelected && selectedIds.length > 1 && (
            <span className='text-grey text-[13px] px-1 py-[0.8px] ml-2'>
              +{selectedIds.length - 1}
            </span>
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
            'text-grey text-[13px] resize-none overflow-hidden',
            'border border-purple-primary rounded-sm focus:outline-none px-[3px] py-0 w-full'
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

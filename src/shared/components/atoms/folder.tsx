'use client'

import type { IconName } from '@/constants/icons'
import useClickOutside from '@/hook/use-click-outside'
import { cn } from '@/lib/utils'
import { useTreeContext } from '@/shared/context/tree-data-context'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type React from 'react'
import { Icon } from './icon'
type FolderItemProps = {
  id: string
  name: string
  isExpanded?: boolean
  level?: number
  onToggle: () => void
  children?: ReactNode
  onSelect?: (e: React.MouseEvent) => void
  isSelected?: boolean
  className?: string
  iconClassName?: string
  iconName?: IconName
  canRename?: boolean
  isPreview?: boolean
  selectedIds: string[]
} & React.HTMLAttributes<HTMLDivElement>

function FolderItem({
  id,
  name,
  isSelected = false,
  children,
  iconClassName,
  iconName,
  onSelect,
  isExpanded,
  onToggle,
  canRename = true,
  isPreview,
  selectedIds,
  className,
  ...props
}: FolderItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [folderName, setFolderName] = useState(name)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { updateTreeNodeName } = useTreeContext()

  function handleName(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFolderName(e.target.value)
    if (inputRef) {
      const textarea = inputRef.current
      if (textarea) {
        const height = textarea.scrollHeight ?? 0
        textarea.style.height = height > 0 ? `${height}px` : 'auto'
      }
    }
  }
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    clickTimeout.current = setTimeout(() => {
      onSelect?.(e)
      clickTimeout.current = null
    }, 20)
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
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
      updateTreeNodeName(id, folderName)
    }
  }

  useClickOutside(inputRef, () => {
    setIsEditing(false)
  })

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const textarea = inputRef.current
      const height = textarea.scrollHeight ?? 0
      textarea.style.height = height > 0 ? `${height}px` : 'auto'
      textarea.select()
    }
  }, [isEditing])

  function handleToggle(e: React.MouseEvent<SVGSVGElement>) {
    e.stopPropagation()
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current)
      clickTimeout.current = null
    }
    onToggle()
  }

  return (
    <>
      <div
        data-selected={isSelected}
        className={cn(
          'px-2 py-1 gap-2 data-[selected="true"]:bg-purple-1 min-h-8 w-full flex transition-all duration-250 items-start select-none',
          isSelected && 'bg-purple-1',
          isPreview && 'border border-purple-primary rounded-[4px] opacity-60',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {!isPreview && (
          <Icon
            name={'chevron'}
            size={16}
            className={cn(
              'text-purple-primary mt-1 shrink-0',
              isExpanded ? 'rotate-270' : 'rotate-180 ',
              'cursor-pointer'
            )}
            onClick={handleToggle}
          />
        )}

        <Icon
          name={iconName || 'folder'}
          size={16}
          className={cn(
            'text-yellow-400 mt-1 shrink-0 cursor-pointer',
            iconClassName
          )}
        />

        {isEditing ? (
          <textarea
            ref={inputRef}
            value={folderName}
            onChange={handleName}
            rows={1}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={cn(
              'text-grey text-sm resize-none overflow-hidden',
              isEditing &&
                'border border-purple-primary rounded-sm focus:outline-none py-0 px-0.5 w-full bg-white'
            )}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className='flex justify-between items-start w-full'>
            <span
              className='text-grey text-sm cursor-pointer py-[0.8px] px-[3px] break-all'
              onDoubleClick={handleDoubleClick}
            >
              {folderName}
            </span>
            {isPreview && isSelected && selectedIds.length > 1 && (
              <div className='absolute -left-1 -top-1 right-1 h-full bg-purple-1 border border-purple-primary -z-10 rounded-[4px]' />
            )}
          </div>
        )}
      </div>

      {isExpanded && children}
    </>
  )
}

export default FolderItem

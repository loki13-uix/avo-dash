'use client'

import type { IconName } from '@/constants/icons'
import useClickOutside from '@/hook/use-click-outside'
import { cn, setNameToTreeNode } from '@/lib/utils'
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
  ...props
}: FolderItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [folderName, setFolderName] = useState(name)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { treeNodes, setTreeNodes } = useTreeContext()

  function handleName(e: { target: { value: React.SetStateAction<string> } }) {
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
    clickTimeout.current = setTimeout(() => {
      onSelect?.(e)
      clickTimeout.current = null
    }, 20)
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current)
      clickTimeout.current = null
    }

    const target = e.target as HTMLElement
    const isChevronIcon = target.closest('.chevron-icon')

    if (canRename && !isChevronIcon) {
      setIsEditing(true)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false)
      setNameToTreeNode(folderName, id, treeNodes, setTreeNodes)
    }
  }

  useClickOutside(inputRef as React.RefObject<HTMLElement>, () => {
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

  return (
    <>
      <div
        data-selected={isSelected}
        className={cn(
          'px-2 py-1 gap-2 data-[selected="true"]:bg-purple-1 min-h-8 w-full flex transition-all duration-250 items-start select-none',
          isSelected && 'bg-purple-1'
        )}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        {...props}
      >
        {!isPreview && (
          <Icon
            name={'chevron'}
            size={16}
            className={cn(
              'chevron-icon fill-grey-12 mt-1 shrink-0',
              isExpanded ? 'rotate-270' : 'rotate-180 '
            )}
            onClick={onToggle}
          />
        )}

        <Icon
          name={iconName || 'folder'}
          size={16}
          className={cn('text-yellow-400 mt-1 shrink-0', iconClassName)}
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
              'text-grey text-[13px] resize-none overflow-hidden',
              isEditing &&
                'border border-purple-primary rounded-sm focus:outline-none py-0 px-0.5 w-full'
            )}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className='flex justify-between items-start w-full'>
            <span className='text-grey text-[13px] cursor-pointer py-[0.8px] px-[3px] break-all'>
              {folderName}
            </span>
            {isPreview && isSelected && selectedIds.length > 1 && (
              <span className='text-grey text-[13px] px-1 py-[0.8px] ml-2'>
                +{selectedIds.length - 1}
              </span>
            )}
          </div>
        )}
      </div>

      {isExpanded && children}
    </>
  )
}

export default FolderItem

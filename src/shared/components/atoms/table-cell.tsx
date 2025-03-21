'use client'
import useClickOutside from '@/hook/use-click-outside'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import { Icon } from './icon'
type TableCellProps = {
  defaultValue?: string
  isSelected?: boolean
  isEditable?: boolean
  isHeader?: boolean
  selectDropdown?: boolean
  options?: { value: string; label: string }[]
  onChange?: (value: string) => void
  onEditingChange?: (isEditing: boolean) => void
  className?: string
  onSelect?: (event: React.MouseEvent) => void
  isReadOnly?: boolean
  title?: string
  showIcon?: boolean
  iconOnClick?: () => void
}

const TableCell = ({
  defaultValue,
  isSelected = false,
  isEditable = false,
  isHeader = false,
  selectDropdown = false,
  options = [],
  onChange,
  onEditingChange,
  className,
  onSelect,
  isReadOnly,
  title,
  showIcon = false,
  iconOnClick,
}: TableCellProps) => {
  const [isEditing, setIsEditing] = useState(isEditable)
  const [inputValue, setInputValue] = useState(defaultValue || '')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useClickOutside(inputRef, () => handleEditEnd(false))

  useEffect(() => {
    setInputValue(defaultValue || '')
  }, [defaultValue])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
      const textarea = inputRef.current
      const height = textarea.scrollHeight ?? 0
      textarea.style.height = height > 0 ? `${height}px` : 'auto'
    }
  }, [isEditing])

  const handleEditStart = () => {
    if (!isHeader && !selectDropdown && !isEditing) {
      setIsEditing(true)
      onEditingChange?.(true)
    }
  }

  const handleEditEnd = (commit: boolean) => {
    setIsEditing(false)
    onEditingChange?.(false)
    if (commit && inputValue !== defaultValue && inputValue !== '') {
      onChange?.(inputValue)
    } else {
      setInputValue(defaultValue || '')
    }
  }

  const handleValueChange = (newValue: string) => {
    setInputValue(newValue)
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
    if (selectDropdown) {
      onChange?.(newValue)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isHeader) return
    onSelect?.(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleEditEnd(true)
      e.preventDefault()
    } else if (e.key === 'Escape') {
      handleEditEnd(false)
      e.preventDefault()
    }
  }

  const baseClassName = cn(
    'border border-grey-3 pt-[6px] px-2 font-open-sans text-grey-13 text-sm min-h-8',
    isSelected && 'bg-purple-1',
    isEditing && 'bg-purple-1',
    selectDropdown && 'pt-0',
    className
  )

  const selectedOption = selectDropdown
    ? options.find((opt) => opt.value === defaultValue) || options[0]
    : null

  if (isHeader) {
    return (
      <div
        className={cn(
          baseClassName,
          'bg-grey-1 flex justify-between align-middle min-h-8'
        )}
      >
        <div>
          <span className='font-semibold'>{defaultValue}</span>
          <span className='font-bold'>{title}</span>
        </div>
        {showIcon && (
          <div>
            <Icon
              name='chevron-down'
              width={20}
              height={20}
              color='text-grey-13'
              onClick={iconOnClick}
              rotate={iconOnClick ? 270 : ''}
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={baseClassName}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDoubleClick={isReadOnly ? undefined : handleEditStart}
    >
      {isEditing && !selectDropdown ? (
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={(e) => handleValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className='text-sm bg-white rounded-sm border border-purple-primary resize-none w-full break-all px-1 focus:outline-none hidescroll h-full'
          rows={1}
        />
      ) : selectDropdown ? (
        <Select value={defaultValue} onValueChange={handleValueChange}>
          <SelectTrigger className='shadow-none p-0 min-h-8 bg-transparent w-full cursor-pointer h-full'>
            <span>{selectedOption?.label}</span>
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className='break-all px-1'>
          {selectDropdown ? selectedOption?.label : defaultValue}
        </div>
      )}
    </div>
  )
}

export default TableCell

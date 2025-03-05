'use client'
import useClickOutside from '@/hook/use-click-outside'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import { Input } from '../ui/input'
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
}: TableCellProps) => {
  const [isEditing, setIsEditing] = useState(isEditable)
  const [inputValue, setInputValue] = useState(defaultValue || '')
  const inputRef = useRef<HTMLInputElement>(null)

  useClickOutside(inputRef, () => handleEditEnd(false))

  useEffect(() => {
    setInputValue(defaultValue || '')
  }, [defaultValue])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
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
    if (selectDropdown) {
      onChange?.(newValue)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isHeader) return
    onSelect?.(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditEnd(true)
      e.preventDefault()
    } else if (e.key === 'Escape') {
      handleEditEnd(false)
      e.preventDefault()
    }
  }

  const baseClassName = cn(
    'py-[6px] px-2 font-open-sans text-grey-13 text-sm',
    isSelected && 'bg-purple-1',
    isEditing && 'bg-purple-1',
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
          'bg-grey-1 flex justify-between align-middle'
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
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => handleValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => handleEditEnd(false)}
          className='text-sm bg-white rounded-sm border border-[#9494F5] px-1'
        />
      ) : selectDropdown ? (
        <Select value={defaultValue} onValueChange={handleValueChange}>
          <SelectTrigger className='shadow-none p-0 h-auto bg-transparent w-full'>
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
        <div>{selectDropdown ? selectedOption?.label : defaultValue}</div>
      )}
    </div>
  )
}

export default TableCell

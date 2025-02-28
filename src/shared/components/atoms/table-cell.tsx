import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface TableCellProps {
  defaultValue?: string
  isSelected?: boolean
  isEditable?: boolean
  isHeader?: boolean
  isSelect?: boolean
  options?: { value: string; label: string }[]
  onChange?: (value: string) => void
  onEditingChange?: (isEditing: boolean) => void
  className?: string
  onSelect?: (event: React.MouseEvent) => void
}

const TableCell = ({
  defaultValue = 'Text',
  isSelected = false,
  isEditable: initialIsEditable = false,
  isHeader = false,
  isSelect = false,
  options = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ],
  onChange,
  onEditingChange,
  className,
  onSelect,
}: TableCellProps) => {
  const [value, setValue] = useState(defaultValue)
  const [isEditing, setIsEditing] = useState(initialIsEditable)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    if (isHeader) return

    if (isSelect) {
      return
    }

    if (onSelect) {
      onSelect(e)
    }
  }

  const handleDoubleClick = () => {
    if (!isHeader && !isSelect && !isEditing) {
      setIsEditing(true)
      if (onEditingChange) {
        onEditingChange(true)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleSelectChange = (newValue: string) => {
    setValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (onEditingChange) {
      onEditingChange(false)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false)
      if (onEditingChange) {
        onEditingChange(false)
      }
      event.preventDefault()
    }
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  if (isHeader) {
    return (
      <div
        className={cn(
          'border border-grey-3 py-[6px] px-2 bg-grey-2',
          className
        )}
      >
        <div className='font-semibold font-open-sans text-grey-13 text-sm'>
          {value}
        </div>
      </div>
    )
  }

  if (isSelect) {
    return (
      <div
        className={cn(
          'border border-grey-3 py-[6px] px-2 hover:bg-[#F5F5FF] flex items-center',
          isSelect && 'bg-[#EBEBFF]',
          className
        )}
      >
        <Select onValueChange={handleSelectChange} value={value}>
          <SelectTrigger className='shadow-none p-0 h-auto bg-transparent font-normal font-open-sans text-grey-13 text-sm w-full'>
            <div className='flex justify-between w-full items-center'>
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                defaultValue={'light'}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'border border-grey-3 py-[6px] px-2 hover:bg-[#F5F5FF]',
        isSelected && 'bg-[#EBEBFF]',
        isEditing && 'bg-purple-1',
        className
      )}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
    >
      {!isEditing ? (
        <div className='font-normal font-open-sans text-grey-13 text-sm'>
          {value}
        </div>
      ) : (
        <Input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className='font-normal font-open-sans text-grey-13 text-sm bg-white rounded-sm border border-[#9494F5]'
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  )
}

export default TableCell
